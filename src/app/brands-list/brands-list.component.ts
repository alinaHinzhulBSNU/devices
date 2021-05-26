import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Brand } from '../models/brand.model';
import { BrandsService } from '../shared/brands.service';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.scss']
})
export class BrandsListComponent implements OnInit {
  brands: Brand[] = [];

  constructor(public service: BrandsService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.refreshList();

    this.service.notifyObservable.subscribe(
      res => {
        this.refreshList();
    });
  }

  // Reactive form
  form = this.fb.group({
    name: null
  });

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

  search(){
    var data = this.form.value;

    if(data.name != null){
      this.service.searchForBrand(data.name).subscribe(
        data => {
          this.brands = data as Brand[];
          this.form.reset();
        }
      );
    }else{
      this.refreshList();
    }
  }
}
