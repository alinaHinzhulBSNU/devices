import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Device } from '../models/device.model';
import { NewItem } from '../models/new-item.model';
import { DevicesService } from '../shared/devices.service';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.scss']
})
export class DevicesListComponent implements OnInit {
  devices: Device[] = [];
  items: NewItem[] = [];
  
  constructor(private devices_service: DevicesService, 
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadDevices();
    this.refreshItemsList();
  }

  // Reactive form
  form = this.fb.group({
    price: null
  });

  // Get all devices
  loadDevices(){
    this.devices_service.getDevices().subscribe(
      data => {
        this.devices = data as Device[];
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

  // Add to shopping cart
  addToShoppingCart(device: Device){
    // Only change quantity of items
    if(this.items != null){
      for(var i = 0; i < this.items.length; i++){
        if(this.items[i].device.id == device.id){
          this.items[i].quantity += 1;
          this.saveToLocalStorage();
          return 0;
        }
      }
    }else{
      this.items = [];
    }

    // Or add new item to local storage
    var new_item = new NewItem();
    new_item.device = device;
    new_item.quantity = 1;
    this.items.push(new_item);

    this.saveToLocalStorage();
  }

  // Save items to local storage
  saveToLocalStorage(){
    localStorage.removeItem('items');
    var new_items = JSON.stringify(this.items);
    localStorage.setItem('items', new_items);
  }

  // Search by price
  search(){
    var data = this.form.value;

    if(data.price != null){
      this.devices_service.searchForDevice(data.price).subscribe(
        data => {
          this.devices = data as Device[];
          this.form.reset();
        }
      );
    }else{
      this.loadDevices();
    }
  }
}
