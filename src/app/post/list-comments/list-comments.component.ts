import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GetPostsService } from '../get-posts.service';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.css']
})
export class ListCommentsComponent implements OnInit {
  
  Counter :number;
  commentdata :any;
  listUsers :string;
  saveCommentData :any;
  newComment: string;
  postId: any = {};
  ShowhideEditPost :boolean;
  IdforPost :any;
  
  @Input() post_ID :any;

  @Output() comments_event : EventEmitter<any> = new EventEmitter();

  constructor(private _http: HttpClient,private _getPost:GetPostsService) { }

  DeletePost(){
    this.postId = {"pid": this.post_ID};
    this._http.post('http://localhost:3000/deletePost', this.postId).subscribe((err : HttpErrorResponse)=>{      
      console.log(err.message);
    });
    
    this._getPost.getAllPosts().subscribe((data: any) => {               
      this.comments_event.emit(data);
    },
    (err : HttpErrorResponse)=>{
      console.log(err.message);
    });
   }

   ShowComments(){
      this.postId = {"pid": this.post_ID}; 
      this._http.post('http://localhost:3000/getCommentsbyId', this.postId).subscribe((data: any) => {               
      if(data){
          this.commentdata = data;                                                     
        }        
      },
      (err : HttpErrorResponse)=>{
        console.log(err.message);
      });   
    }

   SaveComment(){
     this.saveCommentData = {
      "postId": this.post_ID,
      "commentBody": this.newComment,
      "Createdby": "admin",
     };
     this._http.post('http://localhost:3000/SaveComment', this.saveCommentData).subscribe((data: any) => {               
      if(data){
            alert("Comment added successfully !!");  
            this.ShowComments();           
            this.newComment = "";
        }        
      },
      (err : HttpErrorResponse)=>{
        console.log(err.message);
      }); 
   }

   LikeUnlikePost(){
    this._http.post('http://localhost:3000/SaveLikedPostData', { postId: this.post_ID}).subscribe((data: any) => {               
      if(data){      

        this.postId = {"pid": this.post_ID};
        this._http.post('http://localhost:3000/getListofAllUserLikedPost', this.postId).subscribe((data: any) => {               
        if(data){                          
          this.Counter = data.length;                                        
          }        
        },
        (err : HttpErrorResponse)=>{
          console.log(err.message);
        });                               
        }
                
      },
      (err : HttpErrorResponse)=>{
        console.log(err.message);
      });
   }

   GetAllUsernames(){
    this.postId = {"pid": this.post_ID};
    this._http.post('http://localhost:3000/getListofAllUserLikedPost', this.postId).subscribe((data: any) => {               
      if(data){           
        if(data.length > 0){
          this.listUsers = "Liked by: " + data.join(", ");
          }
          else{
            this.listUsers = "Liked by: none";
          }                                        
        }        
      },
      (err : HttpErrorResponse)=>{
        console.log(err.message);
      }); 
   }

   editPost(){
    this.ShowhideEditPost = !this.ShowhideEditPost;
   }

  ngOnInit() {
    this.IdforPost = this.post_ID;

    this.postId = {"pid": this.post_ID};
    this._http.post('http://localhost:3000/getListofAllUserLikedPost', this.postId).subscribe((data: any) => {               
      if(data){  
        console.log("ngOnInit");
        console.log(data);                
        this.Counter = data.length;                                        
        }        
      },
      (err : HttpErrorResponse)=>{
        console.log(err.message);
      }); 
  }

}
