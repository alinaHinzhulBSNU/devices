import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { City } from '../models/city.model';
import { CitiesService } from '../shared/cities.service';
import {formatDate } from '@angular/common';
import { OrdersService } from '../shared/orders.service';
import { OrderedItem } from '../models/ordered-item.model';
import { Order } from '../models/order.model';
import { ItemsService } from '../shared/items.service';
import { Router } from '@angular/router';

@Component({
  selector: 'make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.scss']
})
export class MakeOrderComponent implements OnInit {
  cities: City[] = [];
  items: OrderedItem[] = [];

  constructor(private fb: FormBuilder,
              private cities_service: CitiesService,
              private orders_service: OrdersService,
              private items_service: ItemsService,
              private router: Router) { }

  // Reactive form
  form = this.fb.group({
    customer_name: '',
    address: '',
    phone: '',
    city_id: '',
    date: this.getDate()
  });

  ngOnInit(): void {
    this.loadCities();
    this.refreshItemsList();

    this.orders_service.notifyObservable.subscribe(
      res => {
        this.refreshItemsList();
    });
  }

  // List of cities for form
  loadCities(){
    this.cities_service.getCities().subscribe(
      data => {
        this.cities = data as City[];
      }
    );
  }

  // Add order and related items
  makeOrder(){
    var formData = this.form.value;

    this.orders_service.addOrder(formData).subscribe(
      data => {
        var order = data as Order;
        console.log(this.items);
        this.items.forEach(item => {
          var item_data = {device_id: item.device.id, order_id: order.id, quantity: item.quantity }
          this.items_service.addItem(item_data).subscribe(
            data => {
              localStorage.removeItem('items');
              this.router.navigateByUrl("/");
            }
          );
        });
      }
    );
  }

  // Load items from local storage
  refreshItemsList(){
    var content = localStorage.getItem("items");
    if(content != ''){
      this.items = JSON.parse(content);
    }
  }

  // Form  date for SQL server
  getDate(){
    let now = new Date();
    let year = formatDate(now, 'yyyy-MM-dd', 'en_US', '+0530');
    let time = formatDate(now, 'hh:mm:ss', 'en_US', '+0530');

    return year + "T" + time; 
  }
}
