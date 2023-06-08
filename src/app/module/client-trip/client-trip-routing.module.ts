import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';
import { ClientTripListComponent } from './client-trip-list/client-trip-list.component';
import { ClientTripComponent } from './client-trip/client-trip.component';
import { CashComponent } from './client-trip/cash/cash.component';
import { CreditComponent } from './client-trip/credit/credit.component';
import { BillingComponent } from './billing/billing.component';


const routes: Routes = [
  {path: '', redirectTo: 'trip-list', pathMatch: 'full'},
  {path: "trip-list", component: ClientTripListComponent},
  {path: 'trip', component: ClientTripComponent, children:[
    {path:'', redirectTo: 'credit', pathMatch: 'full'},
    {path: 'cash', component:CashComponent},
    {path: 'credit', component:CreditComponent},
  ]},
  {path: 'billing', component: BillingComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  // declarations: [VehicleListComponent, OwnerListComponent, BrokerListComponent, DriverListComponent],
  exports: [RouterModule],
})
export class ClentTripRoutingModule { }
