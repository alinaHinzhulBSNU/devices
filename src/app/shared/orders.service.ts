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

  // Додавання замовлення
  addOrder(order: Order, date: string){
    let params = new HttpParams();
    params = params.append('address', order.address);
    params = params.append('customer_name', order.customer_name);
    params = params.append('phone', order.phone);
    params = params.append('date', date);
    params = params.append('city_id', "1");

    let URL = this.rootURL + "orders?" + params.toString();
    return this.http.get(URL);
  }
}
