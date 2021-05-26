import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order.model';
import { OrdersService } from '../shared/orders.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orders_service: OrdersService) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(){
    this.orders_service.getOrders().subscribe(
      data => {
        this.orders = data as Order[];
      }
    );
  }

  delete(id: number){
    this.orders_service.deleteOrder(id).subscribe(
      data => {
        this.refreshList();
      }
    );
  }

  getTotalSum(order: Order){
    var total_sum = 0;

    order.items.forEach(item => {
      total_sum += +item.total_sum;
    });

    return total_sum;
  }
}
