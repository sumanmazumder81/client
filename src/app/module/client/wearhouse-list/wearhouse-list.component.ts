import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { NotificationService } from '../../../services/notification.service';
@Component({
  selector: 'wearhouse-list',
  templateUrl: './wearhouse-list.component.html',
  styleUrls: ['./wearhouse-list.component.scss']
})

export class WearhouseListComponent implements OnInit {
  @Input('clientData') clientData: any;
  public loader: boolean = false;
  dataSource = ELEMENT_DATA;
  displayedColumns: any[] = [];
  public tableHeader: any[] = [
    { label: 'Wear House Name', key: 'name' },
    { label: 'Contact No', key: 'contact[0].contactNumberList[0].contactNo' },
    { label: 'Street Name', key: 'address[0].streetName' },
    { label: 'Wear House Code', key: 'warehouseCode' },
    { label: 'Action', key: 'action' },
  ];
  public wearhouseList: any;
  public popUp: boolean = false;
  public wearHouseId: number = 0;
  public clientId: number = 0;

  constructor(
    private _router: Router,
    private service: ClientService,
    private notification: NotificationService,
    private activeRouter: ActivatedRoute,
    private router: Router
  ) {
    console.log("First constructor call");
    this.activeRouter.queryParams.subscribe((params: any) => {
      this.clientId = params.clientId
      console.log(this.clientId);
    });
  }

  ngOnInit(): void {
    console.log("Second ngOnit call");
    this.getWearHouseList();
    this.displayedColumns = this.tableHeader.map((element: any) => {
      // console.log(element);
      return element.key
    });


  }
  outputClientId(event:any){
    console.log(event);
    this.clientId = event
  }
  ngOnChanges(change: SimpleChanges) {
    console.log(change);

  }
  getSellData(element: any, key: any) {
    // return element
    return _.get(element, key) ? _.get(element, key) : '';
  }

  getWearHouseList() {
    this.loader = true;
    // alert("call component");
    console.log(this.clientId);
    this.service.wearHouseList(this.clientId).subscribe(
      (res: any) => {
        console.log(res);
        this.loader = false;
        this.notification.showSuccess('wear house list', '');
        this.wearhouseList = new MatTableDataSource<interfacTableData>(res);
      }, (error: any) => {
        console.log(error);
        this.loader = false;
        this.notification.showError('successfull weahouse', error);
      }, () => {
        this.loader = false;
      }
    )

  }

  addWearhouse() {
    let navigateId: NavigationExtras = {
      queryParams: {
        clientId: this.clientId,
      }
    }
    console.log(navigateId);
    this._router.navigate([`./dashboard/client/ware-house/`],navigateId)
  }

  // delete process
  delete(id: number) {
    this.popUp = true;
    console.log(id);
    this.wearHouseId = id;
  }
  Yes() {
    this.loader = true;
    this.popUp = false;
    this.service.wearHouseDelete(this.clientId, this.wearHouseId).subscribe(
      (res: any) => {
        console.log(res);
        this.loader = false;
        this.notification.showSuccess('Successfuly delete', '');
        this.getWearHouseList();
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
  edit(id: number) {
    console.log(id);

    // this._router.navigate([`dashboard/client/ware-house/${id}`], navigateId)
    this._router.navigate([`dashboard/client/ware-house/${id}`])
  }

  // receiverList(){
  //   this._router.navigate([`dashboard/client/client/receiver-list/${this.clientId}`])
  // }

}
export interface interfacTableData {
  streetName: string;
  zipCode: string;
  conatactNumber: string;
  wearhouseName: string;
  action: string;
}
const ELEMENT_DATA: any[] = [
  { streetName: 'HOOGHLY', zipCode: '700056', conatactNumber: '7890740945', wearhouseName: 'Chandan Nagar', action: '' },

];


