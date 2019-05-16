import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GetPostsService } from '../get-posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  
  @Input() pID :any;
  @Output() comments_event : EventEmitter<any> = new EventEmitter();

  datapost :any;
  updatedpostdata :any;
  ptitle: string;
  pbody: string;

  constructor(private _http: HttpClient,private _getPost:GetPostsService) { }

  ngOnInit() {   
    this._http.post('http://localhost:3000/getPostbyId', {"pid": this.pID}).subscribe((data: any) => {               
      if(data){        
            this.datapost = data;            
        }        
      },
      (err : HttpErrorResponse)=>{
        console.log(err.message);
      });
  }

  SaveEditedPost(){
    this.updatedpostdata = {
      "pid": this.pID,
      "postTitle": this.ptitle,
      "postBody": this.pbody
    };

    this._http.post('http://localhost:3000/updatePost', this.updatedpostdata).subscribe((data: any) => {               
      if(data){        
          this._getPost.updatePostdata();
        }                       
      },
      (err : HttpErrorResponse)=>{
        console.log(err.message);
      });
  }
  

}
