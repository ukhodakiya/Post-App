import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  showLinksByAuthStatus : boolean;

  constructor(private _router: Router, private _auth:AuthService) { }

  ngOnInit() {
    this._auth.$authCheck.subscribe((data:any)=>{
        this.showLinksByAuthStatus = data;
    });
  }

  Logout(){
    this._auth.Logout();
  }

}
