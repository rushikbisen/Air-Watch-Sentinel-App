import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
//   @Output() searchCity = new EventEmitter<string>();
//   ngOnInit():void{

//   }
//   check=[
//    {'name':'India','image':'../../assets/india.jpg'},
//    {'name':'Canada','image':'../../assets/canada.webp'},
//    {'name':'Australia','image':'../../assets/australia.jpg'},
//    {'name':'England','image':'../../assets/england.webp'},

//  ]
//   search(city: string) {
//     this.searchCity.emit(city);
//   }
@Input() result: any;

  getBackgroundColor() {
    const aqi = this.result.aqi;
    if (aqi >= 0 && aqi <= 50) {
      return 'green';
    } else if (aqi <= 100) {
      return 'yellow';
    } else if (aqi <= 150) {
      return 'orange';
    } else if (aqi <= 200) {
      return 'red';
    } else if (aqi <= 300) {
      return 'blue';
    } else {
      return 'brown';
    }
  }

  getAirQualityText() {
    const aqi = this.result.aqi;
    if (aqi >= 0 && aqi <= 50) {
      return 'Good air pollution level';
    } else if (aqi <= 100) {
      return 'Moderate air pollution level';
    } else if (aqi <= 150) {
      return 'Unhealthy for sensitive air pollution level';
    } else if (aqi <= 200) {
      return 'Unhealthy air pollution level';
    } else if (aqi <= 300) {
      return 'Very unhealthy air pollution level';
    } else {
      return 'Hazardous air pollution level';
    }
  }
}
