import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '../../../../../node_modules/@angular/forms';
import { ClientService } from '../../../services/client.service';
import { NotificationService } from '../../../services/notification.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'receiver-details',
  templateUrl: './receiver-details.component.html',
  styleUrls: ['./receiver-details.component.scss']
})
export class ReceiverDetailsComponent implements OnInit {
  public receiverDetails : FormGroup;
  public loader: boolean = false;
  public receiverEditId: any = 0;
  public clientId: any = 0;
  public receiverCode: any;
  constructor(
    private formBuilder: FormBuilder,
    private service : ClientService,
    private notification: NotificationService,
    private activeRouter: ActivatedRoute,
    private location: Location,
  ) {
    this.receiverDetails = new FormGroup({
      id: new FormControl(''),
      clientId: new FormControl(''),
      receiverCode: new FormControl(''),
      receiverName: new FormControl('', Validators.required),
      companyName: new FormControl('', Validators.required),
      gstNumber: new FormControl('', Validators.required),
      contact: new FormArray([]),
      address: new FormGroup({
        streetNumber: new FormControl('', Validators.required),
        streetName: new FormControl('', Validators.required),
        landMark: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        zipCode: new FormControl('', Validators.required),
      }),
    })
  }

  ngOnInit(): void {
    this.addContact();
    this.contactNumberAdd(0);

    this.activeRouter.queryParams.subscribe(
      (res:any)=>{
        console.log(res);
        this.clientId = res.clientId
      }
    )

    this.receiverEditId = this.activeRouter.snapshot.paramMap.get('id');
    console.log(this.receiverEditId);
    this.reciverEditHandler(this.receiverEditId)
  }


  // contact
  createContact(fieldLabel?: string): FormGroup{
    return this.formBuilder.group({
      contactPersonName: new FormControl('', Validators.required),
      emailId: new FormControl('', Validators.required),
      contactNumberList: new FormArray([])
    })
  }
  getContactArray(): FormArray{
    return this.receiverDetails?.get('contact')as FormArray;
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
    return (this.receiverDetails?.get('contact')as FormArray).controls[index].get('contactNumberList')as FormArray;
  }
  addContact(){
    this.getContactArray().push(this.createContact());
    console.log(this.receiverDetails);
  }
  removeContact(index: number){
    this.getContactArray().removeAt(index);
  }

  contactNumberAdd(index:number){
    console.log(index);
    const optionAdd = (this.receiverDetails?.get('contact')as FormArray).controls[index]?.get('contactNumberList')as FormArray;
    console.log(optionAdd);
    optionAdd.push(this.contactNumberList());
  }
  deletePhoneNumber(contactIndex:number, ContactNumberIndex:number){
    const deleteNumber = (this.receiverDetails?.get('contact')as FormArray).controls[contactIndex]?.get('contactNumberList')as FormArray;
    deleteNumber.removeAt(ContactNumberIndex);
  }


  receiverDetailsSubmit(){
    console.log(this.clientId);

    this.loader = true;
    this.receiverDetails.patchValue({
      clientId: this.clientId,
    });
    console.log(this.receiverDetails.value);
    this.service.receiverSubmitHandeler(this.receiverDetails.value).subscribe(
      (res:any)=>{
        console.log(res);
        this.loader = false;
        this.notification.showSuccess( 'successfully submited', '');
        this.location.back();
      },(error:any)=>{
        console.log(error);
        this.loader = false;
      },()=>{
        this.loader = false;
      }
    )
  }


  // Edit get data
  reciverEditHandler(id:number){
    if(id){
      this.loader = true;
      this.service.receiverDataGet(id).subscribe(
        (res:any)=>{
          console.log(res);
          this.loader = false;
          this.receiverCode = res.receiverCode;
          res.contact.forEach((element:any, contactIndex:number) => {
            // console.log(element, index1);
            if(contactIndex > 0){
              console.log(contactIndex);
              (this.receiverDetails?.get('contact') as FormArray).push(this.createContact());
              element.contactNumberList.forEach((item:any, contactListIndex:number) => {
                // console.log(item, index);
                // if(contactListIndex >= 1){
                  console.log(contactListIndex);
                  ((this.receiverDetails?.get('contact') as FormArray).controls[contactIndex].get('contactNumberList')as FormArray).push(this.contactNumberList())
                // }
              });
            }
          });
          this.receiverDetails.patchValue(res);
        },(error:any)=>{
          console.log(error);
          this.loader = false;
        },()=>{
          this.loader = false;
        }
      )
    }
  }

  receiverEditSubmit(){
    this.loader = true;
    console.log(this.receiverEditId);
    this.receiverDetails.patchValue({
      receiverCode: this.receiverCode,
      id: this.receiverEditId,
    })
    console.log(this.receiverDetails.value);
    this.service.receiverUpdate(this.receiverEditId, this.receiverDetails.value).subscribe(
      (res:any)=>{
        console.log(res);
        this.loader = false;
        this.notification.showSuccess('succesfully Update', 'Receiver');
        // this.router.navigate([`/dashboard/client/client-list`]);
        this.location.back();
      },(error:any)=>{
        console.log(error);
        this.loader = false;
        this.notification.showSuccess('failure Update', error);
      },()=>{
        this.loader = false;
      }
    )
  }

}
