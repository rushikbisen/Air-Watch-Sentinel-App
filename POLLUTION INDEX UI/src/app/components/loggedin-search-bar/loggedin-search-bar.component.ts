import { Component, Input, OnInit } from '@angular/core';
import { WatchlistComponent } from '../watchlist/watchlist.component';
import { WatchlistData } from 'src/app/models/watchlist.model';
import { NgToastService } from 'ng-angular-popup';
import { WatchlistService } from 'src/app/services/watchlist.service';
import { LoggedinCardDisplayComponent } from '../loggedin-card-display/loggedin-card-display.component';

@Component({
  selector: 'app-loggedin-search-bar',
  templateUrl: './loggedin-search-bar.component.html',
  styleUrls: ['./loggedin-search-bar.component.css']
})
export class LoggedinSearchBarComponent implements OnInit {

  arr?:any=[];
  watchlistDataObj:WatchlistData=new WatchlistData();
  constructor(private toast : NgToastService,
    private watchlistservice:WatchlistService,
    private display:LoggedinCardDisplayComponent) { }

  ngOnInit():void{
    
  }
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
  addToWatchlist(item:any):void{
    this.watchlistDataObj.username=localStorage.getItem('username');
    this.watchlistDataObj.city=item.city.name;
    this.watchlistDataObj.aqi=item.aqi;
    //this.watchlistDataObj.location=item.city.geo;
    this.watchlistDataObj.time=item.time.s;
    //this.watchlistDataObj.iaqi=item.iaqi;

    console.log(this.watchlistDataObj);

    this.watchlistservice.addToWatchlist(this.watchlistDataObj).subscribe({
      next:(res)=>{
        console.log(res);
        this.toast.success({detail:"SUCCESS",summary:res.message,duration:5000});
      },
      error:(err)=>{
        console.log(err);
        this.toast.error({detail:"ERROR",summary:err.message,duration:5000});
      }
    })
  }
}
