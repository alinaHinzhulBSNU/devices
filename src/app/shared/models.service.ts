import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  readonly rootURL = environment.baseURL; // URL, що використовується у всіх CRUD - запитах

  constructor(public http: HttpClient) { }

  //CRUD OPERATIONS
  
  //Get all models
  getModels(){
    return this.http.get(this.rootURL + 'models');
  }

  // Get one model
  getModel(id: number){
    return this.http.get(this.rootURL + 'models/' + id);
  }

  // Додавання пристрою
  /*addDevice(device: Device){
    let params = new HttpParams();
    params = params.append('number', device.number);
    params = params.append('presentation_year', String(device.presentation_year));
    params = params.append('model_code', device.model);

    return this.http.get(this.rootURL + '/devices/add?' + params.toString());
  }

  // Редагування пристрою
  editDevice(device: Device){
    let params = new HttpParams();
    params = params.append('number', device.number);
    params = params.append('presentation_year', String(device.presentation_year));

    return this.http.get(this.rootURL + '/devices/edit/' + device.id + '?' + params.toString());
  }

  // Видалення пристрою
  deleteDevice(id: number){
    return this.http.delete(this.rootURL + '/devices/delete/' + id);
  }

  // Отримати всі доступні моделі
  getModels(){
    return this.http.get(this.rootURL + '/devices/models');
  }

  // Отримати список пристроїв за моделлю
  getDevicesByModel(id: number){
    return this.http.get(this.rootURL + '/devices/get-by-model/' + id);
  }*/
}
