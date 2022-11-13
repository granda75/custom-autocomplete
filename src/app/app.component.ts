import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  city: string = '';
  title = 'cities-autocomplete';

  setCityName($event: any) {
    this.city = $event.name;
  }
}
