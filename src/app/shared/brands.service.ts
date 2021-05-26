import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Brand } from '../models/brand.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  readonly rootURL = environment.baseURL; // URL, що використовується у всіх CRUD - запитах
  public selectedBrand: Brand = new Brand();

  // Refresh all related components
  public notify = new BehaviorSubject({refresh: false});
  notifyObservable = this.notify.asObservable();

  constructor(public http: HttpClient) { }

  setSelectedBrand(brand: Brand){
    this.selectedBrand = brand;
    this.refresh();
  }

  refresh(){
    this.notify.next({refresh: true});
  }

  // CRUD OPERATIONS
  getBrands(){ // GET
    return this.http.get(this.rootURL + 'brands');
  }

  addBrand(brand: Brand){ // POST 
    return this.http.post(this.rootURL + 'brands', brand);
  }

  editBrand(brand: Brand){ // PUT
    return this.http.put(this.rootURL + 'brands/' + brand.id, brand);
  }

  deleteBrand(id){ // DELETE
    return this.http.delete(this.rootURL + 'brands/' + id);
  }

  searchForBrand(brand_name: string){
    return this.http.get(this.rootURL + 'brands/search/' + brand_name);
  }
}
