import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private _http: HttpClient,private _router: Router) { }

  signup: any;
  submitNewUser(form: NgForm) {
    this._http.post('http://localhost:3000/createUser', form.value).subscribe((data: any) => {         
        this._router.navigate(['/login']);
    },
    (err : HttpErrorResponse)=>{
      console.log(err.message);
    });
  }


  ngOnInit() {
  }
}
