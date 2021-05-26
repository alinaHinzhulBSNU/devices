import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  readonly rootURL = environment.baseURL; // URL, що використовується у всіх CRUD - запитах
  
  constructor(public http: HttpClient) { }

  //CRUD OPERATIONS
  getCities(){
    return this.http.get(this.rootURL + 'cities');
  }
}
