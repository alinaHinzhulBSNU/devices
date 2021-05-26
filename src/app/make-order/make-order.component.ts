import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { City } from '../models/city.model';
import { Order } from '../models/order.model';
import { CitiesService } from '../shared/cities.service';
import {formatDate } from '@angular/common';
import { OrdersService } from '../shared/orders.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.scss']
})
export class MakeOrderComponent implements OnInit {
  cities: City[] = [];

  constructor(private fb: FormBuilder,
              private toast: ToastrService,
              private router: Router,
              private cities_service: CitiesService,
              private orders_service: OrdersService) { }

  // Reactive form
  form = this.fb.group({
    customer_name: '',
    address: '',
    phone: '',
    city: '',
  });

  ngOnInit(): void {
    this.loadCities();
  }

  // List of cities for form
  loadCities(){
    this.cities_service.getCities().subscribe(
      data => {
        this.cities = data as City[];
      }
    );
  }

  // Add order and order details
  makeOrder(){
    // Order
    var order = this.form.value as Order;

    // Calc date and time
    let now = new Date();
    let year = formatDate(now, 'yyyy-MM-dd', 'en_US', '+0530');
    let time = formatDate(now, 'hh:mm:ss', 'en_US', '+0530');

    var date = year + "T" + time; 

    this.orders_service.addOrder(order, date).subscribe(
      data => {
        this.router.navigate(['']);
      }
    );
  }
}
