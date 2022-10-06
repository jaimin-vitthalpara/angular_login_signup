import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurentData } from './restaurent.model';  

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})
export class RestaurentDashComponent implements OnInit {

  formValue! : FormGroup;
  allRestaurentData: any;
  ShowAdd! : boolean;
  ShowUpdate! : boolean;

  // lets create object for posting 
  restaurentModelObj: RestaurentData = new RestaurentData;

  constructor(private formBuilder: FormBuilder ,
    private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: [''],
    }) 

    this.getAllData() 
  }

  // when we click on add restaurent then it will be only display ADD Detail btn , not UPDATE..
  clickAddResto() {
    this.formValue.reset();
    this.ShowAdd = true;
    this.ShowUpdate = false;
  }


  // now we are going to subscribe our data which is maped via services..   && this method will be called on add detail button in HTML.
  addRestaurent() {
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services  = this.formValue.value.services;
    
    this.api.postRestaurent(this.restaurentModelObj).subscribe(res => {
      console.log(res);
      alert('restaurent added successfully..');

      //clear field from data 
      let ref = document.getElementById('clear');
      ref?.click();


      this.formValue.reset();
      this.getAllData(); // when you post any data...
    },
    err => {
      alert("data not added, something is wrong");
    }
    )
  }

  // Get all data and shown in table 
  getAllData() {
    this.api.getRestaurent().subscribe(res => {
      this.allRestaurentData = res;
    })
  }

  // Delete records
  deleteResto(data:any) {
    this.api.deleteRestaurent(data.id).subscribe(res=> {
      alert ("restaurent record deleted successfully..");
      this.getAllData();  // instance for immediate update/refresh data..
    })
  }

  // edit records
  onEditResto(data:any) {
    
    this.ShowAdd = false;
    this.ShowUpdate = true;
    
    this.restaurentModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }

  // update the data
  UpdateResto() {
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services  = this.formValue.value.services;

    this.api.updateRestaurent(this.restaurentModelObj, this.restaurentModelObj.id).subscribe(res => {
      alert("changed update successfully");

      //clear field from data 
      let ref = document.getElementById('clear');
      ref?.click();


      this.formValue.reset();
      this.getAllData(); // when you post any data...

    });
  }

}



