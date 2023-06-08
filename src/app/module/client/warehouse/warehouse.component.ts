import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators, FormControlName } from '../../../../../node_modules/@angular/forms';
import { ClientService } from '../../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {
  public wareHouse: FormGroup;
  public loader : boolean = false;
  @Output() formActive: EventEmitter<boolean> = new EventEmitter(false);
  @Input ('clientData') clientData :  any;
  public subAccountData = [
    {name: 'Sony', value: 'Sony'},
    {name: 'Philips', value: 'Philips'},
    {name: 'havells', value: 'havells'},
    {name: 'Voltas', value: 'Voltas'},
  ];
  public editWearHouseId: any = 0;
  public clientId: any = 0;
  public warehouseCode: any;
  constructor(
    private formBuilder: FormBuilder,
    private services: ClientService,
    private activeRouter: ActivatedRoute,
    private notification: NotificationService,
    private location: Location,
    private router: Router
  ) {
    this.wareHouse = new FormGroup({
      id: new FormControl(''),
      clientId: new FormControl(''),
      warehouseCode: new FormControl(''),
      meta: new FormControl(""),
      name: new FormControl('', Validators.required),
      address: new FormArray([]),
      contact: new FormArray([]),
    });


  }

  ngOnInit(): void {
    this.addressAdd();

    this.addContact();
    this.contactNumberAdd(0);

    this.activeRouter.queryParams.subscribe(
      (res:any)=>{
        this.clientId = res.clientId
      }
    )

    this.editWearHouseId = this.activeRouter.snapshot.paramMap.get('id');
    console.log(this.editWearHouseId);
    this.getWearHouseData(this.editWearHouseId);
  }
  ngOnChanges(change: SimpleChanges){


  }

  // addess form
  addressGroup():FormGroup<any>{
    return this.formBuilder.group({
      streetNumber: new FormControl('', Validators.required),
      streetName: new FormControl('', Validators.required),
      landMark: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required),
      subAccount: new FormControl('', Validators.required)
    })
  }
  getAddressArray():FormArray{
    return this.wareHouse?.get('address')as FormArray;
  }
  addressAdd(){
    this.getAddressArray().push(this.addressGroup());
  }
  deleteAddress(index: number){
    this.getAddressArray().removeAt(index);
  }

  // contact form
  createContact(fieldLabel?: string): FormGroup{
    return this.formBuilder.group({
      contactPersonName: new FormControl('', Validators.required),
      emailId: new FormControl('', Validators.required),
      contactNumberList: new FormArray([])
    })
  }
  getContactArray(): FormArray{
    return this.wareHouse?.get('contact')as FormArray;
  }

  contactNumberList():FormGroup{
    return this.formBuilder.group({
      contactNo: new FormControl('', [Validators.required, Validators.min(1000000000), Validators.max(99999999999)]),
      whatappStatus: new FormControl(false),
      primaryNumber: new FormControl(false),
    })
  }
  getContactNumberArray(index: number, item:any): FormArray{
    // console.log(item);
    return (this.wareHouse?.get('contact')as FormArray).controls[index].get('contactNumberList')as FormArray;
  }
  addContact(){
    this.getContactArray().push(this.createContact());
    console.log(this.wareHouse);
  }
  removeContact(index: number){
    this.getContactArray().removeAt(index);
  }

  contactNumberAdd(index:number){
    console.log(index);
    const optionAdd = (this.wareHouse?.get('contact')as FormArray).controls[index]?.get('contactNumberList')as FormArray;
    console.log(optionAdd);
    optionAdd.push(this.contactNumberList());
  }
  deletePhoneNumber(contactIndex:number, ContactNumberIndex:number){
    const deleteNumber = (this.wareHouse?.get('contact')as FormArray).controls[contactIndex]?.get('contactNumberList')as FormArray;
    deleteNumber.removeAt(ContactNumberIndex);
  }

  // post wear house
  wareHouseSubmit(){
    this.loader = true;
    this.wareHouse.patchValue({
      clientId: this.clientId,
    })
    console.log(this.wareHouse.value);
    this.services.wearHouseSubmitHandeler(this.wareHouse.value).subscribe(
      (res:any)=>{
        console.log(res);
        this.loader = false;
        this.formActive.emit(true);
        this.notification.showSuccess( 'successfully submited', '');
        this.location.back();
      },(error:any)=>{
        console.log(error);
        this.loader = false;
        this.formActive.emit(true);
      },()=>{
        this.loader = false;
      }
    )

  }

  // put wear house
  getWearHouseData(id:number){
    if(id){
      this.loader = true;
      this.services.wearHouseGet(id).subscribe(
        (res:any)=>{
          console.log(res);
          this.loader = false;
          this.warehouseCode = res.warehouseCode;

          res.contact.forEach((element:any, contactIndex:number) => {
            // console.log(element, index1);
            if(contactIndex > 0){
              console.log(contactIndex);
              (this.wareHouse?.get('contact') as FormArray).push(this.createContact());

              element.contactNumberList.forEach((item:any, contactListIndex:number) => {
                // console.log(item, index);
                // if(contactListIndex > 0){
                  console.log(contactListIndex);
                  ((this.wareHouse?.get('contact') as FormArray).controls[contactIndex].get('contactNumberList')as FormArray).push(this.contactNumberList())
                // }
              });

            }
          });
          // address array
          res.address.forEach((element:any, addressndex:number) => {
            // console.log(element, addressndex);
            if(addressndex > 0){
              console.log(addressndex);
              (this.wareHouse?.get('address') as FormArray).push(this.addressGroup());
            }
          });
          this.wareHouse.patchValue(res);
        },(error:any)=>{
          console.log(error);
          this.loader = false;
        },()=>{
          this.loader = false;
        }
      )
    }
  }
  wareHouseEditSubmit(){
    this.loader = true;
    this.wareHouse.patchValue({
      warehouseCode: this.warehouseCode,
      id: this.editWearHouseId,
    })
    console.log(this.wareHouse.value);
    this.services.wearHouseUpdate(this.editWearHouseId, this.wareHouse.value).subscribe(
      (res:any)=>{
        console.log(res);
        this.loader = false;
        this.notification.showSuccess('succesfully Update', 'Wear house');
        // this.router.navigate([``])
        this.location.back();
      },(error:any)=>{
        console.log(error);
        this.loader = false;
        this.notification.showError('failure Update', error);
      },()=>{
        this.loader = false;
      }
    )
  }

}
