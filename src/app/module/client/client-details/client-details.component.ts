import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, FormControlName } from '../../../../../node_modules/@angular/forms';
import { ClientService } from '../../../services/client.service';
// import { MatStepper } from '../../../../../node_modules/@angular/material/stepper';
import {MatStepperModule} from '@angular/material/stepper';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { NotificationService } from '../../../services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss'],

})
export class ClientDetailsComponent implements OnInit {
  public clientDetails : FormGroup;
  isLinear = false;
  isComplete: boolean = false;
  public loader : boolean = false;
  public wearHouseFormStaus : boolean = false;
  public clientData : any;
  public editClientId: any = 0;
  public clientCode: any;
  public billingType = [
    {viewValue: 'Cash', value: 'cash'},
    {viewValue: 'Credit', value: 'credit'},
  ]


  constructor(
    private formBuilder: FormBuilder,
    // public stepper: MatStepper
    private clientServices: ClientService,
    private stepper: MatStepperModule,
    public notification: NotificationService,
    private activeRouter: ActivatedRoute,
    private router: Router
  ) {
    this.clientDetails = new FormGroup({
      id: new FormControl(''),
      companyName: new FormControl('', Validators.required),
      gstNumber: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(15)]),
      clientCode: new FormControl(''),
      address: new FormGroup({
        streetNumber: new FormControl('', Validators.required),
        streetName: new FormControl('', Validators.required),
        landMark: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        zipCode: new FormControl('', Validators.required),
      }),
      contact: new FormArray([]),
      meta :new FormGroup({
        billingType: new FormControl(''),
      })
    });
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  createContact(fieldLabel?: string): FormGroup{
    return this.formBuilder.group({
      contactPersonName: new FormControl('', Validators.required),
      emailId: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      contactNumberList: new FormArray([])
    })
  }
  getContactArray(): FormArray{
    return this.clientDetails?.get('contact')as FormArray;
  }

  contactNumberList():FormGroup{
    return this.formBuilder.group({
      contactNo: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(10), Validators.maxLength(10)]),
      whatappStatus: new FormControl(false),
      primaryNumber: new FormControl(false),
    })
  }
  getContactNumberArray(index: number): FormArray{
    // console.log(item);
    return (this.clientDetails?.get('contact')as FormArray).controls[index].get('contactNumberList')as FormArray;
  }
  ngOnInit(): void {
    this.addContact();
    this.contactNumberAdd(0);
    this.editClientId = this.activeRouter.snapshot.paramMap.get('id');
    console.log(this.editClientId);
    this.clientEditHandler(this.editClientId)
  }


  addContact(){
    this.getContactArray().push(this.createContact());
    console.log(this.clientDetails);
  }
  removeContact(index: number){
    this.getContactArray().removeAt(index);
  }

  contactNumberAdd(index:number){
    console.log(index);
    const optionAdd = (this.clientDetails?.get('contact')as FormArray).controls[index]?.get('contactNumberList')as FormArray;
    console.log(optionAdd);
    optionAdd.push(this.contactNumberList());
  }
  deletePhoneNumber(contactIndex:number, ContactNumberIndex:number){
    const deleteNumber = (this.clientDetails?.get('contact')as FormArray).controls[contactIndex]?.get('contactNumberList')as FormArray;
    deleteNumber.removeAt(ContactNumberIndex);
  }

  public wearHouseformActive(e:any){
    console.log(e);
    this.wearHouseFormStaus = e;
  }

  clientDetailsSubmit(){
    console.log(this.clientDetails.value);
    this.loader = true;
    this.clientServices.clientSubmitHandeler(this.clientDetails.value).subscribe(
      (res:any)=>{
        console.log(res);
        this.clientData = res.id;
        this.loader = false;
        // this.stepper.next();
        this.isComplete = true;
        this.notification.showSuccess( 'successfully submited', '');
        this.isLinear = false;
        this.router.navigate([`/dashboard/client/client/client-list`]);
      },(error:any)=>{
        console.log(error);
        this.loader = false;
      },()=>{
        this.loader = false;
      }
    )
  }
  goto_component1(data:any){
    console.log(data);

  }

  // Edit get data
  clientEditHandler(id:number){
    if(id){
      this.loader = true;
      this.clientServices.clientDataGet(id).subscribe(
        (res:any)=>{
          console.log("Edit data", res);
          this.loader = false;
          this.clientCode = res.clientCode;


          res.contact.forEach((element:any, contactIndex:number) => {
            // console.log(element, index1);
            if(contactIndex > 0){
              console.log(contactIndex);
              (this.clientDetails?.get('contact') as FormArray).push(this.createContact());

              element.contactNumberList.forEach((item:any, contactListIndex:number) => {
                // console.log(item, index);
                // if(contactListIndex >= 1){
                  console.log(contactListIndex);
                  ((this.clientDetails?.get('contact') as FormArray).controls[contactIndex].get('contactNumberList')as FormArray).push(this.contactNumberList())
                // }
              });

            }
          });
          this.clientDetails.patchValue(res);
        },(error:any)=>{
          console.log(error);
          this.loader = false;
        },()=>{
          this.loader = false;
        }
      )
    }
  }

  clientEditSubmit(){
    this.loader = true;
    this.clientDetails.patchValue({
      clientCode: this.clientCode,
      id: this.editClientId,
    })
    console.log(this.clientDetails.value);
    this.clientServices.clientEditDataGet(this.editClientId, this.clientDetails.value).subscribe(
      (res:any)=>{
        console.log(res);
        this.loader = false;
        this.notification.showSuccess('succesfully Update', 'Client List');
        this.router.navigate([`/dashboard/client/client/client-list`]);
      },(error:any)=>{
        console.log(error);
        this.loader = false;
        this.notification.showSuccess('failure Update', error);
      },()=>{
        this.loader = false;
      }
    )
  }
  primaryNumberChange(status:any, contactIndex:number, ContactNumberIndex:number){
    console.log("primary number status", status.checked, "contact index", contactIndex, ContactNumberIndex);
    const contactList = (this.clientDetails?.get('contact')as FormArray).controls[contactIndex]?.get('contactNumberList')as FormArray;
    // const contactListIndex = contactList.controls[index];
    console.log(contactList);
    const filterArray = contactList.value.filter((ele:any)=> {
      if(ele.primaryNumber === false){
        console.log(ele.primaryNumber);
        return ele;
      }
    });
    console.log(filterArray);
  }

}
