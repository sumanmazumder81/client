import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import * as _ from 'lodash';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'receiver-list',
  templateUrl: './receiver-list.component.html',
  styleUrls: ['./receiver-list.component.scss']
})
export class ReceiverListComponent implements OnInit {
  public loader : boolean = false;
  // dataSource = ELEMENT_DATA;
  displayedColumns: any[] =[];
  public tableHeader:any[] = [
    {label: 'Company Name', key: 'companyName'},
    {label: 'Contact No', key: 'contact[0].contactNumberList[0].contactNo'},
    {label: 'Street Name', key: 'address.streetName'},
    {label: 'Receiver Name', key: 'receiverName'},
    {label: 'Action', key: 'action'},
  ];

  public allReceiverList: any[] = [];
  public receiverList:any;
  public clientId: any = 0;
  public receiverId: number = 0;
  public popUp: boolean = false;
  constructor(
    private _router: Router,
    private service: ClientService,
    private notification: NotificationService,
    private activeRouter: ActivatedRoute
  ) {
    // this.activeRouter.queryParams.subscribe((params: any) => {
    //   this.clientId = params.id
    //   console.log(this.clientId);
    // });
    // this.clientId = this.activeRouter.snapshot.paramMap.get('clientId');
    // console.log(this.clientId);
    this.activeRouter.queryParams.subscribe((params:any) => {
      this.clientId = params.clientId
      console.log(params.clientId);
    })
  }

  ngOnInit(): void {
    this.getReceiverList();
    this.displayedColumns = this.tableHeader.map( (element:any)=> {
      return element.key
    });

  }
  outputClientId(event:any){
    this.clientId = event
  }
  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
  }
  getSellData(element:any, key:any){
    return _.get(element, key) ? _.get(element, key) : '';
  }

  addReceiver(){
    let navigateId: NavigationExtras = {
      queryParams: {
        clientId: this.clientId,
      }
    }
    console.log(navigateId);
    this._router.navigate([`./dashboard/client/receiver-details`], navigateId)
  }

  getReceiverList(){
    this.loader = true;
    this.service.receiverList(this.clientId).subscribe(
      (res:any)=>{
        console.log(res);
        this.allReceiverList = res
        this.loader = false;
        this.notification.showSuccess('Receiver list', '');
        this.receiverList = new MatTableDataSource<interfacTableData>(this.allReceiverList);
        this.notification.showSuccess('Receiver list', "successfully")
      },(error:any)=>{
        console.log(error);
        this.loader = false;
        this.notification.showError('Receiver list', error);
      },()=>{
        this.loader = false;
      }
    )
  }

  edit(id:number){
    console.log(id);
    this._router.navigate([`dashboard/client/receiver-details/${id}`]);
  }


  // delete process
  delete(id: number) {
    this.popUp = true;
    console.log(id);
    this.receiverId = id;
  }
  Yes() {
    this.loader = true;
    this.popUp = false;
    this.service.receiverDelete(this.clientId, this.receiverId).subscribe(
      (res: any) => {
        console.log(res);
        this.loader = false;
        this.notification.showSuccess('Successfuly delete', '');
        this.getReceiverList();
      }, (error: any) => {
        console.log(error);
        this.loader = false;
      }, () => {
        this.loader = false;
      }
    )
  }
  no() {
    this.popUp = false;
  }

}

export interface interfacTableData {
  streetName: string;
  zipCode: string;
  conatactNumber: string;
  wearhouseName: string;
  action: string;
}
const ELEMENT_DATA: any[] = [
  {streetName : 'HOOGHLY', zipCode: '700056', conatactNumber: '7890740945', wearhouseName: 'Chandan Nagar', action: '' },

];
