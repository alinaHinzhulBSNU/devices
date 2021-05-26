import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Brand } from '../models/brand.model';
import { BrandsService } from '../shared/brands.service';
import { ModelsService } from '../shared/models.service';

@Component({
  selector: 'models-form',
  templateUrl: './models-form.component.html',
  styleUrls: ['./models-form.component.scss']
})
export class ModelsFormComponent implements OnInit {
  brands: Brand[] = [];
  
  constructor(private fb: FormBuilder,
              private models_service: ModelsService,
              private brands_service: BrandsService) { }

  ngOnInit(): void {
    this.loadBrands();

    this.models_service.notifyObservable.subscribe(
      res => {
        this.form = this.fb.group({
          id: [this.models_service.selectedModel?.id],
          model_name: [this.models_service.selectedModel?.model_name],
          diagonal: [this.models_service.selectedModel?.diagonal],
          description: [this.models_service.selectedModel?.description],
          brand_id: [this.models_service.selectedModel?.brand?.id]
        });
    });
  }

  // Reactive form
  form = this.fb.group({
    id: [this.models_service.selectedModel?.id],
    model_name: [this.models_service.selectedModel?.model_name],
    diagonal: [this.models_service.selectedModel?.diagonal],
    description: [this.models_service.selectedModel?.description],
    brand_id: [this.models_service.selectedModel?.brand?.id]
  });

  // Load brands
  loadBrands(){
    this.brands_service.getBrands().subscribe(
      data => {
        this.brands = data as Brand[];
      }
    );
  }

  submit(){
    this.form.value.id == null ? this.add() : this.edit(); 
  }

  add(){
    var formData = this.form.value;
    this.models_service.addModel(formData).subscribe(
      data => {
        this.models_service.refresh();
        this.form.reset();
      }
    );
  }

  edit(){
    var formData = this.form.value;
    this.models_service.editModel(formData).subscribe(
      data => {
        this.models_service.refresh();
        this.form.reset();
      }
    );
  }
}
