import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loggedin-card-display',
  templateUrl: './loggedin-card-display.component.html',
  styleUrls: ['./loggedin-card-display.component.css']
})
export class LoggedinCardDisplayComponent{

  city: string = '';
  result: any = null;

  constructor(private http: HttpClient) { }

  search() {
    const apiUrl = `http://api.waqi.info/feed/${this.city}/?token=a23eb84a8670eb3bca160465ae8f9f704d73620f`;

    this.http.get(apiUrl).subscribe((data: any) => {
      this.result = data.data;
    });
  }

}
