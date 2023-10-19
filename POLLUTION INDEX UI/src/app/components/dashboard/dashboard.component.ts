import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { WatchlistData } from 'src/app/models/watchlist.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public users:any=[];
  public fullName:string=""
  private apiUrl = 'https://api.openaq.org/v1/latest';
  name = localStorage.getItem('username')

  constructor(
    private auth:AuthService,
    ){}

  ngOnInit(){
      
  }
  
}
