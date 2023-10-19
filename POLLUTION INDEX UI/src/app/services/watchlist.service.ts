import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService implements OnInit{

  private baseUrl:string="https://localhost:7035/api/WatchList";
  private watchlistItems:any[]=[];
  constructor(private http:HttpClient,private authService:AuthService) { }
  ngOnInit():void{
    
  }
  addToWatchlist(item:any){
    console.log(item);
    return this.http.post<any>(`${this.baseUrl}/watchlist`,item);
  }
  getWatchlistItems():any[]{
    return this.watchlistItems;
  }
  getItems(){
    return this.http.get(`${this.baseUrl}/byUsername/${localStorage.getItem('username')}`).
    pipe(map((res:any)=>{
      return res;
    }));
  }

  removeFromWatchList(username:any){
    //return this.http.delete<any>(`${this.baseUrl}/${username},${city}`);
    return this.http.delete<any>(`${this.baseUrl}/${username}`);
   
  }
}
