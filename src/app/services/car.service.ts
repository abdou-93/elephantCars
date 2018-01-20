import {Injectable} from '@angular/core';
import {Car} from '../models/car';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CarService {
  readonly carsPath = 'cars';
  readonly countriesPath = 'countries';
  private carsRef: AngularFireList<any>;
  private _carsStream: Observable<any[]>;
  private countriesRef: AngularFireList<any>;
  private _countriesStream: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.initialize();
  }

  initialize(): void {
    this.carsRef = this.db.list(this.carsPath);
    // Use snapshotChanges().map() to store the key
    this._carsStream = this.carsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    this.countriesRef = this.db.list(this.countriesPath);
    // Use snapshotChanges().map() to store the key and value for country
    this._countriesStream = this.countriesRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, value: c.payload.val() }));
    });
  }

  get carsStream(): Observable<any[]> {
    return this._carsStream;
  }

  get countriesStream(): Observable<any[]> {
    return this._countriesStream;
  }

  addCar(car: Car): void {
    this.carsRef.push(car);
  }

  removeCar(key: string): void {
    const promise = this.carsRef.remove(key);
    promise
      .then(_ => console.log('success'))
      .catch(err => console.log(err, 'You do not have access!'));
  }

  getCar(key: string): Observable<Car> {
    return this.db.object(this.carsPath + '/' + key).snapshotChanges()
      .map(c => {
        if (c.payload.val()) {
          return {key: c.payload.key, ...c.payload.val()};
        } else {
          return null;
        }
      });
  }
}
