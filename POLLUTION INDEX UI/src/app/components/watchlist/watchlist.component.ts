import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { WatchlistService } from 'src/app/services/watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  username:any="";
  watchlistItems:any[]=[];
  loggedIn:boolean=true;
  id!:string;
  constructor(
    private watchlistservice:WatchlistService,
    private toast : NgToastService
  ) { }

  ngOnInit(): void {
    this.displayitem();
  }
  displayitem(){
    this.watchlistservice.getItems().subscribe(res=>{
      this.watchlistItems=res;
    })
  }
  removeFromWatchlist(username:any){
    console.log(username)
    this.watchlistservice.removeFromWatchList(localStorage.getItem('username')).subscribe({
      next:(res)=>{
        console.log(res);
        this.toast.success({detail:"SUCCESS",summary:res.message,duration:5000});
        this.displayitem();
      },
      error:(err)=>{
        this.displayitem();
      }
    });
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
}
