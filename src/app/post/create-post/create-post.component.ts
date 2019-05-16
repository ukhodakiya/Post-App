import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(private _http: HttpClient) { }
  post: any = {};  
  showSuccessMsg: boolean;

  ngOnInit() {
  }
  
  SubmitNewPost(){      
    this._http.post('http://localhost:3000/createPost', this.post).subscribe((data: any) => {                     
      if(data){        
        this.showSuccessMsg = true;     
        setTimeout (() => {
          this.showSuccessMsg = false; 
       }, 2000);   
          this.post = {};                                 
      }           
    },
    (err : HttpErrorResponse)=>{
    
    });

  }


}
