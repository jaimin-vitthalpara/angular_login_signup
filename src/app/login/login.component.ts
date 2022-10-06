import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // buttonDisable!: Boolean;

  loginform! : FormGroup

  constructor(private formbuilder: FormBuilder , 
    private _http: HttpClient , private router: Router) { } 

  ngOnInit(): void {

    // this.buttonDisable = false;
    this.loginform = this.formbuilder.group({
      email: ['', Validators.required],
      password: ['' , Validators.required]
    })
  }

  // login method
  login() {
    this._http.get<any>("http://localhost:3000/signup").subscribe (res => {
      // match email & password from signup 
      const user = res.find((a:any)=> {
        return a.email === this.loginform.value.email && a.password === this.loginform.value.password
      });
      if(user){
        alert("login successfully");
        this.loginform.reset();
        this.router.navigate(['restaurent']);
      }
      else{
        alert("user not found..!!");
      }
    },
    err => {
      alert('something wrong in server side');
    })
  }

}
