import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-client-trip-list',
  templateUrl: './client-trip-list.component.html',
  styleUrls: ['./client-trip-list.component.scss']
})
export class ClientTripListComponent implements OnInit {
  public clientTrip : FormGroup;
  public receiver = [{name:'', value:''}];
  public clients = [{name:'', value:''}];
  public drivers = [{name:'', value:''}];
  constructor() {
    this.clientTrip = new FormGroup({
      receivername: new FormControl('', Validators.required),
      client: new FormControl('', Validators.required),
      driver: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

}
