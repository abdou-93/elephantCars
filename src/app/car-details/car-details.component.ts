import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CarService} from '../services/car.service';
import {Car} from '../models/car';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit , OnDestroy {
  car: Car;
  carSubscribe: any;

  constructor(private route: ActivatedRoute,
              public carService: CarService,
              private router: Router) {
  }

  ngOnInit() {
    this.getCar();
  }

  getCar(): void {
    const id = this.route.snapshot.paramMap.get('id');
    try {
      this.carSubscribe = this.carService.getCar(id).subscribe(car => {
        this.car = car;
      });
    } catch (e) {
      console.log('error get car ', e);
    }
  }

  ngOnDestroy(): void {
    this.carSubscribe.unsubscribe();
  }
}
