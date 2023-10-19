import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string="https://localhost:7275/api/User"
  private userPayLoad:any;
  constructor(private http : HttpClient,private router:Router) { 
    
  }

  signUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}/register`,userObj)
  }

  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}/authenticate`,loginObj)
    // this.http.post<any>(`${this.baseUrl}authenticate`,loginObj).subscribe((result:any)=>{
    // this.router.navigate(['home'])
    }

  logout(){
    localStorage.clear();
    this.router.navigate(['login'])
  }
  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue)
  }
  getUser(){
    return localStorage.getItem('username');
  }
  storeUser(usernameValue:string)
  {
    localStorage.setItem('username',usernameValue)
  }
  getToken(){
    return localStorage.getItem('token');
  }
  isLoggedIn():boolean{
    return !!localStorage.getItem('token')
    
    //!! converts string to boolean
  }
  // decodedToken(){
  //   const jwtHelper = new JwtHelperService()
  //   const token = this.getToken()!;
  //   console.log(jwtHelper.decodeToken(token));
  //   return jwtHelper.decodeToken(token)
  // }
  // getFullNameFromToken(){
  //   if(this.userPayLoad)
  //   return this.userPayLoad.name;
  // }
  updateUser(userObj:any)
  {
    return this.http.put<any>(`${this.baseUrl}`,userObj);
  }

  


  getprofile()
  {
    return this.http.get<any>(`${this.baseUrl}/${this.getUser()}`)
    .pipe(map((res:any) => {
      return res;
    }));
  }
}
