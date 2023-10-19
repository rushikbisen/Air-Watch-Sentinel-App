import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgToastModule } from 'ng-angular-popup';
import { HeaderComponent } from './components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CardDisplayComponent } from './components/card-display/card-display.component';
import { FooterComponent } from './components/footer/footer.component';
//import { TokenInterceptor } from './interceptors/token.interceptor';
import { HomeComponent } from './components/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon'
import { SecondApiComponent } from './components/second-api/second-api.component';
import { SecondApiCardDisplayComponent } from './components/second-api-card-display/second-api-card-display.component';
import { NormalHeaderComponent } from './components/normal-header/normal-header.component';
import { NormalHeaderSignupComponent } from './components/normal-header-signup/normal-header-signup.component';
import { LoggedinHeaderComponent } from './components/loggedin-header/loggedin-header.component';
import { LoggedinCardDisplayComponent } from './components/loggedin-card-display/loggedin-card-display.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { LoggedinSearchBarComponent } from './components/loggedin-search-bar/loggedin-search-bar.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    HeaderComponent,
    SearchBarComponent,
    CardDisplayComponent,
    FooterComponent,
    HomeComponent,
    SecondApiComponent,
    SecondApiCardDisplayComponent,
    NormalHeaderComponent,
    NormalHeaderSignupComponent,
    LoggedinHeaderComponent,
    LoggedinCardDisplayComponent,
    WatchlistComponent,
    LoggedinSearchBarComponent,
    EditProfileComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    FormsModule,
    MatCardModule,
    MatIconModule
  ],
  providers: [
    //{
    // provide:HTTP_INTERCEPTORS,
    // useClass:TokenInterceptor,
    // multi:true
  //}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
