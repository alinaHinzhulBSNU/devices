import { Component, OnInit } from '@angular/core';
import { NewItem } from '../models/new-item.model';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
  
  items: NewItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.refreshItemsList();
  }

  // Load items from local storage
  refreshItemsList(){
    var content = localStorage.getItem("items");
    if(content != ''){
      this.items = JSON.parse(content);
    }
  }

  // Change quantity of items in the cart
  add(item: NewItem){
    for(var i = 0; i < this.items.length; i++){
      if(this.items[i].device.id == item.device.id){
        this.items[i].quantity += 1;
        this.saveToLocalStorage();
        this.refreshItemsList();
      }
    }
  }

  // Change quantity or remove item
  remove(item: NewItem){
    for(var i = 0; i < this.items.length; i++){
      if(this.items[i].device.id == item.device.id){
        this.items[i].quantity -= 1;

        if(this.items[i].quantity == 0){
          this.items.splice(i, 1);
        }

        this.saveToLocalStorage();
        this.refreshItemsList();
      }
    }
  }

  // Save items to local storage
  saveToLocalStorage(){
    localStorage.removeItem('items');
    var new_items = JSON.stringify(this.items);
    localStorage.setItem('items', new_items);
  }
}
