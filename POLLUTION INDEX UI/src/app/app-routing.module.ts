import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CardDisplayComponent } from './components/card-display/card-display.component';
import { SecondApiCardDisplayComponent } from './components/second-api-card-display/second-api-card-display.component';
import { SecondApiComponent } from './components/second-api/second-api.component';
import { NormalHeaderComponent } from './components/normal-header/normal-header.component';
import { NormalHeaderSignupComponent } from './components/normal-header-signup/normal-header-signup.component';
import { LoggedinHeaderComponent } from './components/loggedin-header/loggedin-header.component';
import { LoggedinCardDisplayComponent } from './components/loggedin-card-display/loggedin-card-display.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { LoggedinSearchBarComponent } from './components/loggedin-search-bar/loggedin-search-bar.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { AboutComponent } from './components/about/about.component';

//import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'home',component:HomeComponent},
  {path:'search-bar',component:SearchBarComponent},
  {path:'card-display',component:CardDisplayComponent},
  {path:'normal-header',component:NormalHeaderComponent},
  {path:'normal-header-signup',component:NormalHeaderSignupComponent,canActivate:[AuthGuard]},
  {path:'loggedin-header',component:LoggedinHeaderComponent},
  {path:'second-api-card-display',component:SecondApiCardDisplayComponent},
  {path:'second-api',component:SecondApiComponent,canActivate:[AuthGuard]},
  {path:'loggedin-card-display',component:LoggedinCardDisplayComponent},
  {path:'watchlist',component:WatchlistComponent,canActivate:[AuthGuard]},
  {path:'loggedin-search-bar',component:LoggedinSearchBarComponent},
  {path:'edit-profile',component:EditProfileComponent},
  {path:'about',component:AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
