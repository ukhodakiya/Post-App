import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _authservice: AuthService) { }
  ngOnInit() {        
    
  }

  user: any = {};

  Login() {    
    this._authservice.login(this.user); 
  }
}
