import { Component, OnInit } from '@angular/core';
import { GetPostsService } from '../get-posts.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {
 
  constructor(private _getPost:GetPostsService) {   
   }
   postdata :any;
   ShowhideEditPost :boolean;
 
  ngOnInit() {
    this.ShowAllPosts();

    this._getPost.$obsv.subscribe(()=>{
      this.ShowAllPosts();
    });
  }

  ReloadAllPosts(posts:any){    
    this.postdata = posts;
  }

  editPost(){
    this.ShowhideEditPost = !this.ShowhideEditPost;
   }

   ShowAllPosts(){
    this._getPost.getAllPosts().subscribe((data: any) => {               
      this.postdata = data;
    },
    (err : HttpErrorResponse)=>{
      console.log(err.message);
    });
   }

}
