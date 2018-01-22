import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { Car } from '../models/car';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-cars-table',
  templateUrl: './cars-table.component.html',
  styleUrls: ['./cars-table.component.css']
})
export class CarsTableComponent implements OnInit {
  displayedColumns = ['brand', 'country', 'year', 'delete'];
  dataSource: any;

  constructor(public carService: CarService) { }

  ngOnInit() {
    this.dataSource = new CarDataSource(this.carService);
  }

  remove(key: string): void {
    this.carService.removeCar(key);
  }
}

export class CarDataSource extends DataSource<any> {
  constructor(private carService: CarService) {
    super();
  }

  connect(): Observable<Car[]> {
    return this.carService.carsStream;
  }

  disconnect(): void {
  }
}
