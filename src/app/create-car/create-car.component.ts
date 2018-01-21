import { Component, OnInit } from '@angular/core';
import {Car} from '../models/car';
import {CarService} from '../services/car.service';
import {Router} from '@angular/router';

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

  constructor(public carService: CarService, private router: Router) { }

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
      this.router.navigate(['/home']);
    } catch (e) {
      console.log('error on submit ', e);
    }
  }

}
