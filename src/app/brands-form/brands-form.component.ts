import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BrandsListComponent } from '../brands-list/brands-list.component';
import { Brand } from '../models/brand.model';
import { BrandsService } from '../shared/brands.service';

@Component({
  selector: 'brands-form',
  templateUrl: './brands-form.component.html',
  styleUrls: ['./brands-form.component.scss']
})
export class BrandsFormComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private service: BrandsService) { }

  ngOnInit(): void {
    this.service.notifyObservable.subscribe(
      res => {
        this.form = this.fb.group({
          id: [this.service.selectedBrand?.id],
          brand_name: [this.service.selectedBrand?.brand_name]
        });
    });
  }

  // Reactive form
  form = this.fb.group({
    id: [this.service.selectedBrand?.id],
    brand_name: [this.service.selectedBrand?.brand_name]
  });

  submit(){
      this.form.value.id == null ? this.add() : this.edit();
  }

  add(){
    var brand = this.form.value as Brand;
    this.service.addBrand(brand).subscribe(
      data => {
        this.service.refresh();
        this.form.reset();
      }
    );
  }

  edit(){
    var brand = this.form.value as Brand;
    this.service.editBrand(brand).subscribe(
      data => {
        this.service.refresh();
        this.form.reset();
      }
    );
  }
}
