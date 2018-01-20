import { Component, OnInit } from '@angular/core';
import {CarService} from '../services/car.service';

@Component({
  selector: 'app-cars-table',
  templateUrl: './cars-table.component.html',
  styleUrls: ['./cars-table.component.css']
})
export class CarsTableComponent implements OnInit {

  constructor(public carService: CarService) { }

  ngOnInit() {
  }

  remove(key: string): void {
    this.carService.removeCar(key);
  }
}
