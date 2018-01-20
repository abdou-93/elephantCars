import { Component, OnInit } from '@angular/core';
import {Car} from '../models/car';
import {CarService} from '../services/car.service';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css']
})
export class CreateCarComponent implements OnInit {
  brand: string;
  country: string;
  date: any;
  imageURL: string;

  constructor(public carService: CarService) { }

  ngOnInit() {
  }

  onSubmit(): void {
    try {
      const car = new Car({
        brand: this.brand,
        country: this.country,
        year: (new Date(this.date).getFullYear()),
        imageURL: this.imageURL
      });
      this.carService.addCar(car);
    } catch (e) {
      console.log('error on submit ', e);
    }
  }

}
