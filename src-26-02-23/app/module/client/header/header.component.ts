import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // @Input('clientId') clientId : number;
  @Input('clientId') client_Id: any;
  @Output() outputClientId : EventEmitter<number> = new EventEmitter();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.client_Id);

  }
  clientStepper() {
    this.router.navigate([`dashboard/client/client/client-list`]);
    this.outputClientId.emit(this.client_Id);
  }
  warehouseStepper() {
    // if(this.accesRouter){
      // this.router.navigate([`/dashboard/client/client/ware-house-list/${this.clientId}`]);
      this.router.navigate([`/dashboard/client/client/ware-house-list/`], {queryParams: {clientId:this.client_Id}});
      this.outputClientId.emit(this.client_Id)
    // }
  }
  receiverStepper() {
    // this.accesRouter = this.activeRouter.snapshot.paramMap.get('clientId');
    // console.log(this.accesRouter);
    // if(this.accesRouter){
      // this.router.navigate([`/dashboard/client/client/receiver-list/${this.clientId}`]);
      this.router.navigate([`/dashboard/client/client/receiver-list/`], {queryParams: {clientId:this.client_Id}});
      this.outputClientId.emit(this.client_Id);
    // }

  }
}
