import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientTripListComponent } from './client-trip-list/client-trip-list.component';
import { ClientTripComponent } from './client-trip/client-trip.component';
import { CreditComponent } from './client-trip/credit/credit.component';
import { CashComponent } from './client-trip/cash/cash.component';
import { BillingComponent } from './billing/billing.component';
import { ClentTripRoutingModule } from './client-trip-routing.module';
import { localModule } from '../local.module';



@NgModule({
  declarations: [
    ClientTripListComponent,
    ClientTripComponent,
    CreditComponent,
    CashComponent,
    BillingComponent
  ],
  imports: [
    CommonModule,
    ClentTripRoutingModule,
    localModule
  ]
})
export class ClientTripModule { }
