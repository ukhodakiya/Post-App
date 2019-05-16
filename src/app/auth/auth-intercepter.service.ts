import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpHeaders } from '@angular/common/http'
import { AuthService } from './auth.service';
import { nextContext } from '@angular/core/src/render3';

@Injectable()
export class AuthIntercepterService implements HttpInterceptor{

  constructor(private _auth: AuthService) { }

  intercept(req, next){      
    if(this._auth.getToken() != undefined){
      const reqClone  = req.clone({
          headers: new HttpHeaders().set("token", this._auth.getToken())
      });       
    return next.handle(reqClone);
    
  }
    else{
      return next.handle(req);
    }
  }
}
