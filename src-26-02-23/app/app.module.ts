import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// directive
import { AddClassDirective } from './directives/add-class.directive';
import { NotFoundComponent } from './components/not-found/not-found.component';


// common module
import { localModule } from './module/local.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { httpInterceptorProviders } from './interceptor';

import {ConnectionServiceModule} from 'ng-connection-service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddClassDirective,
    NotFoundComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    localModule,
    ConnectionServiceModule,
  ],
  providers: [
    httpInterceptorProviders,

  ],
  bootstrap: [AppComponent],
  entryComponents:[]
})
export class AppModule { }
