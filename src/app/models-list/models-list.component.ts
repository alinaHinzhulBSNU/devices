import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Model } from '../models/model.model';
import { ModelsService } from '../shared/models.service';

@Component({
  selector: 'app-models-list',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.scss']
})
export class ModelsListComponent implements OnInit {
  models: Model[] = [];

  constructor(private service: ModelsService,
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

  // Get all models
  refreshList(){
    this.service.getModels().subscribe(
      data => {
        this.models = data as Model[];
      }
    );
  }

  delete(id: number){
    this.service.deleteModel(id).subscribe(
      data => {
        this.refreshList();
      }
    );
  }
  
  selectModel(model: Model){
    this.service.setSelectedModel(model);
  }

  search(){
    var data = this.form.value;
    
    if(data.name != null){
      this.service.searchForModel(data.name).subscribe(
        data => {
          this.models = data as Model[];
          this.form.reset();
        }
      );
    }else{
      this.refreshList();
    }
  }
}
