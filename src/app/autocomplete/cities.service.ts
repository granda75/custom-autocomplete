import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;
  }

  getCities(): Observable<string[]> {
    return this.http.get(this.url + "cities")
      .pipe(map((value: any) => value));
  }
}
