import { Component, OnInit, Inject, ViewChild  } from '@angular/core';
import * as _ from 'lodash';
import { Router, NavigationExtras } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { NotificationService } from '../../../services/notification.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatStepperModule} from '@angular/material/stepper';
import { MatStepper } from '../../../../../node_modules/@angular/material/stepper';
import { Location } from '@angular/common';
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  isLinear = false;

  dataSource = ELEMENT_DATA;
  public loader:boolean = false;
  displayedColumns: any[] =[];
  public tableHeader:any[] = [
    {label: 'Company name', key: 'companyName'},
    {label: 'Contact person', key: 'contact[0].contactPersonName'},
    {label: 'GST number', key: 'gstNumber'},
    {label: 'Address', key: 'address.streetName'},
    {label: 'Action', key: 'action'},
  ];
  public clientList: any = [];
  public popUp: boolean = false;
  public clientId: number = 0;


  public pageIndex: number = 1;
  public pageSize: number = 5;
  public searchString: string = '';
  public dataLength: number = 0;
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  // public pageEvent: PageEvent = '';
  @ViewChild('stepper') MatStepper : any;
  public clientComponent : boolean = true;
  public WareHouseComponent : boolean = false;
  public receiverComponent: boolean = false;
  public noData : boolean = false;

  constructor(
    private _router: Router,
    private service: ClientService,
    private notification: NotificationService,
    private stepper: MatStepperModule,
    private location: Location,
    // public stepper: MatStepper
  ) { }

  ngOnInit(): void {
    this.getClientList(this.pageIndex, this.pageSize, this.searchString);
    this.displayedColumns = this.tableHeader.map( (element:any)=> {
      // console.log(element);
      return element.key
    });
  }
  getSellData(element:any, key:any){
    // console.log(element, key);
    // return element
    return _.get(element, key) ? _.get(element, key) : '';
  }
  stepperHandler(index:any){
    console.log(index);
    console.log(this.stepper);
  }
  getClientList(page:any, pageSize:any, searchString:any){
    console.log(page, pageSize, searchString);
    this.loader = true;
    this.service.clientListSearch(page, pageSize, searchString).subscribe(
      (res:any)=>{
        console.log(res);
        this.loader = false;
        this.clientList = new MatTableDataSource<interfacTableData>(res.result);
        console.log(this.clientList);
        if(this.clientList.filteredData.length === 0){
          this.noData = true;
        }
        this.clientList?.filteredData.map((item:any)=>
        {
          console.log(item.address == null);
          (item.address == null) ? 'No data found' : item.addresss;
          return item;
        });
        this.pageIndex = res.currentPage;
        this.pageSize = res.pageSize;
        this.dataLength = res.totalCount;
      },(error:any)=>{
        console.log(error);
        this.loader = false;
      },()=>{
        this.loader = false;
      }
    )
  }
  // search list
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.clientList.filter = filterValue.trim().toLowerCase();
  }
  //pagination List
  onChangePage(pe:PageEvent) {
    console.log(pe);
    this.getClientList(this.pageIndex = pe.pageIndex, this.pageSize = pe.pageSize, this.searchString = '');
  }


  addClientList(){
    this._router.navigate([`./dashboard/client/client-details`]);
    this.WareHouseComponent = false;
      // this.clientComponent = true;
    this.receiverComponent = false;
  }

  // delete process
  delete(id:number){
    this.popUp = true;
    console.log(id);
    this.clientId = id;
  }
  Yes(){
    this.loader = true;
    this.popUp = false;
    this.service.cliendDelete(this.clientId).subscribe(
      (res:any)=>{
        console.log(res);
        this.loader = false;
        this.notification.showSuccess('Successfuly delete', '');
        this.getClientList(this.pageIndex, this.pageSize, this.searchString);
      },(error:any)=>{
        console.log(error);
        this.loader = false;
      },()=>{
        this.loader = false;
      }
    )
  }
  no(){
    this.popUp = false;
  }
  edit(id:number){
    console.log(id);
    this._router.navigate([`dashboard/client/client-details/${id}`]);
  }

  // view client
  clienrView(id:number){
    console.log(id);
    // this.selectionChange(data){};
    this._router.navigate([`dashboard/client/client/ware-house-list`], {queryParams: {clientId:id}});
    this.WareHouseComponent = true;
    this.receiverComponent = true;
  }
  selectionChange(data:any){
    console.log(data);
    if(data.selectedIndex === 0){
      this.clientComponent = false;
      this.receiverComponent = false;
      this.location.back();
    }
    if(data.selectedIndex === 1){
      this.WareHouseComponent = true;
      // this.clientComponent = true;
      // this.receiverComponent = true;
    }
    if(data.selectedIndex === 2){
      // this.receiverComponent = true;
      // this.clientComponent = true;
    }
  }


}
export interface interfacTableData {
  companyName: string;
  contactPersonName: string;
  gstNumber: string;
  address: string;
  action: string;
}
const ELEMENT_DATA: any[] = [
  {streetName : 'HOOGHLY', zipCode: '700056', conatactNumber: '7890740945', wearhouseName: 'Chandan Nagar', action: '' },

];
