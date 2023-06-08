import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '../../../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss']
})
export class CreditComponent implements OnInit {
  public creditForm : FormGroup;
  constructor(
    private formBuilder: FormBuilder
  ) { 
    this.creditForm = new FormGroup({
      bookingDate: new FormControl('', Validators.required),
      client: new FormControl('', Validators.required),
      wheelCapacity: new FormControl('', Validators.required),
      locationOfWareHouse: new FormControl('', Validators.required),
      ac: new FormControl('', Validators.required),
      serviceRoad: new FormControl('', Validators.required),
      trackNo: new FormControl('', Validators.required),
      lrNo: new FormControl('', Validators.required),
      receiverAddress: new FormControl('', Validators.required),
      destination: new FormControl('', Validators.required),
      pinCode: new FormControl('', Validators.required),
      receiverMobileNumber: new FormControl('', Validators.required),
      qty: new FormControl('', Validators.required),
      materialType: new FormControl('', Validators.required),
      invoiceValue: new FormControl('', Validators.required),
      senderInvoiceNo: new FormControl(''),
      invoiceDate: new FormControl(''),
      wayBillNo: new FormControl(''),
      wayBillValidUpload: new FormControl(''),
      customerDetails : new FormArray([])
    })
  }

  ngOnInit(): void {
    this.addCustomerDetails()
  }
  customerDetails():FormGroup{
    return this.formBuilder.group({
      customerField: new FormControl('', ),
      customerValue: new FormControl('', ),
    })
  }
  customerDetailsArray():FormArray{
    return this.creditForm?.get('customerDetails')as FormArray;
  }
  addCustomerDetails(){
    this.customerDetailsArray().push(this.customerDetails())
  }
  removeCustomerDetails(index:number){
    this.customerDetailsArray().removeAt(index);
  }
}
