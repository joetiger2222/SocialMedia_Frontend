import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SinglePost } from '../models/SinglePost.model';
import { SingleComment } from '../models/SingleComment.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  posts!:SinglePost[];
  choosenPostComments!:SingleComment[];
  choosenPostToComment!:SinglePost;
  showCreatePost: boolean = false;
  showAddComment: boolean = false;
  choosenPost!:SinglePost;
  createPostPhoto:File|null = null;
  constructor(private httpClient:HttpClient,private userData:UserDataService,private router:Router){}
  ngOnInit(){
    this.getUserFeed()
   
  }


  getUserFeed(){
    this.httpClient.get<SinglePost[]>(`https://socialmedia1-001-site1.anytempurl.com/api/Post/UserFeed/${this.userData.getUserId}`).subscribe({
      next:res=>{
        this.posts=res;
      },
      error:err=>{
        console.log(err);
      }
    })
  }






  setPhoto(event:Event){
    const inputElement =event.target as HTMLInputElement;
    if(inputElement.files&&inputElement.files[0]){
      this.createPostPhoto=inputElement.files[0];
    }
  }

  createPost(postText:NgForm){
    console.log(postText.value['text']);
    const formData:FormData=new FormData();
    formData.append('Text',postText.value['text']);
    formData.append('UserId',this.userData.getUserId?this.userData.getUserId.toString():'')
    formData.append('FileName',this.createPostPhoto?this.createPostPhoto.name.toString():'')
    formData.append('File',this.createPostPhoto?this.createPostPhoto:'')
    this.httpClient.post(`https://socialmedia1-001-site1.anytempurl.com/api/Post`,formData).subscribe({
      next:res=>{
        this.getUserFeed();
        this.showCreatePost=false
      },
      error:err=>{
        alert('faild to add post')
      }
    })
  }

  openCommentModel(post:SinglePost){
    this.choosenPostToComment=post;
    this.showAddComment=true
    this.choosenPost=post;
    
    this.httpClient.get<SingleComment[]>(`https://socialmedia1-001-site1.anytempurl.com/api/Comment/${post.id}`).subscribe({
      next:res=>{
        console.log(res);
        this.choosenPostComments=res;
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  closeCommentModal(){
    this.showAddComment=false
  }

  

 
}


