import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-second-api',
  templateUrl: './second-api.component.html',
  styleUrls: ['./second-api.component.css']
})
export class SecondApiComponent {

  latitude: string = '';
  longitude: string = '';
  result: any = null;

  constructor(private http: HttpClient) { }

  search() {
    const apiUrl = `https://api.waqi.info/feed/here/?token=a23eb84a8670eb3bca160465ae8f9f704d73620f`;

    this.http.get(apiUrl).subscribe((data: any) => {
      this.result = data.data;
    });
  }

}
