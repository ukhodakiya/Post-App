import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $authCheck = new BehaviorSubject(this.checkUserStatus());
  
  constructor(private _router: Router,private _http: HttpClient) { }
  
  login(credentials:any){            
    this._http.post('http://localhost:3000/IsUserAvailable', credentials).subscribe((data: any) => {               
      if(data.errorMsg && data.errorMsg == "User not exist"){
        alert("Invalid Credentials");
        return false;                            
      }
      else
      {                
        window.localStorage.setItem("token", data.token);  
        this.$authCheck.next(this.checkUserStatus());
        this._router.navigate(['/home']);
      }       
    },
    (err : HttpErrorResponse)=>{
      console.log(err.message); 
    });
}

  checkUserStatus(){
    if(window.localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }    
  }

  getToken(){
    if(window.localStorage.getItem("token")){
      return window.localStorage.getItem("token");
    }    
  }

  Logout(){
    window.localStorage.removeItem("token");
    this.$authCheck.next(this.checkUserStatus());
    this._router.navigate(['/login']);
  }
}

  
