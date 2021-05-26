import { Component, OnInit } from '@angular/core';
import { Brand } from '../models/brand.model';
import { BrandsService } from '../shared/brands.service';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.scss']
})
export class BrandsListComponent implements OnInit {
  brands: Brand[] = [];

  constructor(public service: BrandsService) { }

  ngOnInit(): void {
    this.refreshList();

    this.service.notifyObservable.subscribe(
      res => {
        this.refreshList();
    });
  }

  refreshList(){
    this.service.getBrands().subscribe(
      data => {
        this.brands = data as Brand[];
      }
    );
  }

  delete(id: number){
    this.service.deleteBrand(id).subscribe(
      data => {
        this.refreshList();
      }
    );
  }

  selectBrand(brand: Brand){
    this.service.setSelectedBrand(brand);
  }
}
