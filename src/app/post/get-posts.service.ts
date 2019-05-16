import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetPostsService {

  // $obsv = new Observable((observer) => {
  //   observer.next();
  // })

  $obsv = new Subject();

  constructor(private _http: HttpClient) { }

  getAllPosts()
  {
    return this._http.get('http://localhost:3000/getPosts');
  }

  updatePostdata(){
    this.$obsv.next();
  }
}
