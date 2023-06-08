import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public menus = [
    {id: 1, name: 'Client Details', link: './client', isActive: false, image: '../../../assets/images/home_icon.svg', activeImage: '../../../assets/images/home_icon_active.svg'},
    {id: 2, name: 'Clients Trip', link: './client-trip', isActive: false, image: '../../../assets/images/clients_icon.svg', activeImage: '../../../assets/images/clients_icon_active.svg'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
