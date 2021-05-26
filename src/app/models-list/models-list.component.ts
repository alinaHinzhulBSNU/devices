import { Component, OnInit } from '@angular/core';
import { Model } from '../models/model.model';
import { ModelsService } from '../shared/models.service';

@Component({
  selector: 'app-models-list',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.scss']
})
export class ModelsListComponent implements OnInit {

  models: Model[] = [];
  
  constructor(private service: ModelsService) { }

  ngOnInit(): void {
    this.loadModels();
  }

  // Get all models
  loadModels(){
    this.service.getModels().subscribe(
      data => {
        this.models = data as Model[];
        console.log(this.models);
      }
    );
  }

}
