import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-second-api-card-display',
  templateUrl: './second-api-card-display.component.html',
  styleUrls: ['./second-api-card-display.component.css']
})
export class SecondApiCardDisplayComponent {

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
