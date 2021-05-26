import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Model } from '../models/model.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {
  readonly rootURL = environment.baseURL; // URL, що використовується у всіх CRUD - запитах
  public selectedModel: Model = new Model();

  // Refresh all related components
  public notify = new BehaviorSubject({refresh: false});
  notifyObservable = this.notify.asObservable();

  setSelectedModel(model: Model){
    this.selectedModel = model;
    this.refresh();
  }

  refresh(){
    this.notify.next({refresh: true});
  }

  constructor(public http: HttpClient) { }

  //CRUD OPERATIONS
  getModels(){ // GET
    return this.http.get(this.rootURL + 'models');
  }

  addModel(formData){ // POST
    return this.http.post(this.rootURL + 'models', formData);
  }

  editModel(formData){ // PUT
    return this.http.put(this.rootURL + 'models/' + formData.id, formData);
  }

  deleteModel(id){ // DELETE
    return this.http.delete(this.rootURL + 'models/' + id);
  }

  searchForModel(name: string){
    return this.http.get(this.rootURL + 'models/search/' + name);
  }
}
