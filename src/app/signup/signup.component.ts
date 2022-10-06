import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup

  constructor(private formBuilder: FormBuilder , private router: Router , private _http: HttpClient) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['' , Validators.required],
      email: ['' , Validators.required],
      mobile: ['' , Validators.required],
      password: ['' , Validators.required]
    })
  }

  // make method for create user
  signup(){
    this._http.post<any>("http://localhost:3000/signup" , this.signupForm.value).subscribe(res => {
      alert("registration successful");
      //clear the form
      this.signupForm.reset();
      // for navigate 
      this.router.navigate(['login']);
    },
    err => {
      alert("something is wrong.. singup form not subbmitted");
    }
    );
  }

}
