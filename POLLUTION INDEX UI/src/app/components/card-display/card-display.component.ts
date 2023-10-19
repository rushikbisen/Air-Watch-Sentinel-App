import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.css']
})
export class CardDisplayComponent {
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
