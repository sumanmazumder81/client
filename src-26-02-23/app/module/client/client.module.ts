import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { ReceiverDetailsComponent } from './receiver-details/receiver-details.component';
import { ReceiverListComponent } from './receiver-list/receiver-list.component';

import { localModule } from '../local.module';
import { ClientRoutingModule } from './client-routing.module';
import { WearhouseListComponent } from './wearhouse-list/wearhouse-list.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientComponent } from './client.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    ClientDetailsComponent,
    WarehouseComponent,
    ReceiverDetailsComponent,
    ReceiverListComponent,
    WearhouseListComponent,
    ClientListComponent,
    ClientComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    localModule,
    ClientRoutingModule,
  ],
  exports: [
    HeaderComponent
  ]
})
export class ClientModule { }
