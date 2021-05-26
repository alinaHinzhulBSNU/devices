import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  readonly rootURL = environment.baseURL; // URL, що використовується у всіх CRUD - запитах
  
  constructor(public http: HttpClient) { }

  // CRUD
  getOrders(){ // GET
    return this.http.get(this.rootURL + 'orders');
  }

  addOrder(formData){ // POST 
    return this.http.post(this.rootURL + 'orders', formData);
  }

  deleteOrder(id: number){ // DELETE
    return this.http.delete(this.rootURL + 'orders/' + id);
  }
}
