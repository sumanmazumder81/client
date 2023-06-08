import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { ReceiverDetailsComponent } from './receiver-details/receiver-details.component';
import { ReceiverListComponent } from './receiver-list/receiver-list.component';
import { WearhouseListComponent } from './wearhouse-list/wearhouse-list.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientComponent } from './client.component';

const routes: Routes = [
  {path: '', redirectTo: 'client', pathMatch: 'full'},
  {path: 'client', component: ClientComponent, children:[
    {path:'', redirectTo: 'client-list', pathMatch: 'full'},
    {path: 'client-list', component:ClientListComponent},
    {path: 'receiver-list', component: ReceiverListComponent},
    {path: 'receiver-list/:clientId', component: ReceiverListComponent},
    {path: 'ware-house-list', component: WearhouseListComponent},
    {path: 'ware-house-list/:id', component: WearhouseListComponent},
  ]},
  {path: 'client-details', component:ClientDetailsComponent},
  {path: 'client-details/:id', component:ClientDetailsComponent},
  {path: 'ware-house', component: WarehouseComponent},
  {path: 'ware-house/:id', component: WarehouseComponent},
  {path: 'receiver-details', component: ReceiverDetailsComponent},
  {path: 'receiver-details/:id', component: ReceiverDetailsComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule { }
