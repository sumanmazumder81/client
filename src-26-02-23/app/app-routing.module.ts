import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full', data: {title: 'Login'}},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, children:[
    {path: '', redirectTo : 'client', pathMatch: 'full'},
    {path: 'client', loadChildren: () => import('./module/client/client.module').then(m => m.ClientModule) },
    {path: 'client-trip', loadChildren: () => import('./module/client-trip/client-trip.module').then(m => m.ClientTripModule) },
  ]},
  
  // {path: '**', component: NotFoundComponent, data: { title: 'Page Not Found' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
