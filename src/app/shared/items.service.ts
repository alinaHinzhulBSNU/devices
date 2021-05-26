import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  readonly rootURL = environment.baseURL; // URL, що використовується у всіх CRUD - запитах
  
  constructor(public http: HttpClient) { }

  // CRUD
  getItems(){ // GET
    return this.http.get(this.rootURL + 'items');
  }

  addItem(data){ // POST 
    return this.http.post(this.rootURL + 'items', data);
  }

  getItem(id: number){ // GET
    return this.http.get(this.rootURL + 'items/' + id);
  }
}
