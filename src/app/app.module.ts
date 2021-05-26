import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Toastr
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// HTTP
import { HttpClientModule } from '@angular/common/http';

// Routing and navigation
import { RouterModule } from '@angular/router';

// Forms
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

// Services
import { BrandsService } from './shared/brands.service';
import { ModelsService } from './shared/models.service';
import { DevicesService } from './shared/devices.service';
import { OrdersService } from './shared/orders.service';
import { ItemsService } from './shared/items.service';

// Components
import { AppComponent } from './app.component';
import { ModelsListComponent } from './models-list/models-list.component';
import { DevicesListComponent } from './devices-list/devices-list.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { MakeOrderComponent } from './make-order/make-order.component';
import { BrandsListComponent } from './brands-list/brands-list.component';
import { BrandsFormComponent } from './brands-form/brands-form.component';
import { ModelsFormComponent } from './models-form/models-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ModelsListComponent,
    DevicesListComponent,
    OrdersListComponent,
    ItemsListComponent,
    MakeOrderComponent,
    BrandsListComponent,
    BrandsFormComponent,
    ModelsFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(
      [
        {path: '', component: DevicesListComponent},
        {path: 'models', component: ModelsListComponent},
        {path: 'orders', component: OrdersListComponent},
        {path: 'items', component: ItemsListComponent},
        {path: 'brands', component: BrandsListComponent}
      ]
    ),
    ToastrModule.forRoot()
  ],
  providers: [
    BrandsService,
    ModelsService,
    DevicesService,
    OrdersService,
    ItemsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
