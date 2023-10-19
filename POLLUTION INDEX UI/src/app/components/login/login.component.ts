import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  type:string = "password"
  isText : boolean=false;
  eyeIcon:string="fa-eye-slash";
  loginForm! : FormGroup;
  public resetPasswordEmail!:string;
  public isValidEmail!:boolean;

  constructor(private fb:FormBuilder,
    private auth:AuthService,
    private router:Router,
    private toast:NgToastService,){}
  ngOnInit():void{
    this.loginForm = this.fb.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]],
    })
  }
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon="fa-eye" : this.eyeIcon="fa-eye-slash";
    this.isText? this.type="text" : this.type="password";
  }
  onLogin(){
    if(this.loginForm.valid)
    {
      console.log(this.loginForm.value)
      //send object to database
      //this.auth.login(this.loginForm.value)
      this.auth.login(this.loginForm.value).subscribe({
        next:(res)=>{
          //alert(res.message);
          console.log(res.message)
          
          this.loginForm.reset();
          //localStorage.setItem("username",res.usernameValue)
          this.auth.storeToken(res.token);
          console.log(res.username);
          this.auth.storeUser(res.username)
          
          this.toast.success({detail:"SUCCESS",summary:res.message,duration:5000})
          this.router.navigate(['dashboard']);
        },
        error:(err)=>{
          alert(err?.error.message)
          this.toast.error({detail:"ERROR",duration:5000})
        }
      })
    }
    else
    {
      //throw error
      console.log("Form is not valid")

      this.validateAllFormFields(this.loginForm);
      this.toast.error({detail:"ERROR",summary:"Something went wrong",duration:5000})
      //alert("Your form is invalid")
    }
  }
  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true})
      }
      else if(control instanceof FormGroup){
        this.validateAllFormFields(control)
      }
    })
  }
  checkValidEmail(event:string){
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail=pattern.test(value);
    return this.isValidEmail;
  }
  
}
