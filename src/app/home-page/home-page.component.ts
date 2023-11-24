import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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
    console.log(this.userData.userId)
  }


  getUserFeed(){
    this.httpClient.get<SinglePost[]>(`https://localhost:7093/api/Post/UserFeed/${this.userData.userId}`).subscribe({
      next:res=>{
        this.posts=res;
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  likeOrRemoveLike(postId:string){
    this.httpClient.put(`https://localhost:7093/api/Post/AddOrRemoveLike`,{userId:this.userData.userId,postId:postId}).subscribe({
      next:res=>{
        this.getUserFeed();
      },
      error:err=>{
        alert('Failed to update user like')
      }
    })
  }
  openCreatePostModal(){
    this.showCreatePost=true;
  }

  closeCreatePostModal(){
    this.showCreatePost=false;
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
    formData.append('UserId',this.userData.userId?this.userData.userId.toString():'')
    formData.append('FileName',this.createPostPhoto?this.createPostPhoto.name.toString():'')
    formData.append('File',this.createPostPhoto?this.createPostPhoto:'')
    this.httpClient.post(`https://localhost:7093/api/Post`,formData).subscribe({
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
    
    this.httpClient.get<SingleComment[]>(`https://localhost:7093/api/Comment/${post.id}`).subscribe({
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

  createComment(commentText:NgForm){
    const formData:FormData=new FormData();
    formData.append('Text',commentText.value['text']);
    formData.append('UserId',this.userData.userId?this.userData.userId:'')
    formData.append('FileName',this.createPostPhoto?this.createPostPhoto.name:'')
    formData.append('File',this.createPostPhoto?this.createPostPhoto:'')
    formData.append('PostId',this.choosenPostToComment?this.choosenPostToComment.id:'')
    this.httpClient.post<SingleComment>(`https://localhost:7093/api/Comment/${this.choosenPostToComment.id}`,formData).subscribe({
      next:res=>{
        console.log(res);
        
        this.choosenPostComments.push(res)
      },
      error:err=>{
        console.log(err);
      }
    })
    // this.httpClient.get<SingleComment[]>(`https://localhost:7093/api/Comment/${this.choosenPostToComment.id}`).subscribe({
    //   next:res=>{
    //     console.log(res);
    //     this.choosenPostComments=res;
    //   },
    //   error:err=>{
    //     console.log(err);
    //   }
    // })
    
  }

  navigateToProflePage(userId:string){
    this.router.navigate(['/profile/'+userId])
  }
}

interface SinglePost{
  id:string;
  text:string;
  likes:number;
  userId:string;
  filePath:string;
  isLiked:boolean;
  fullName:string
}

interface SingleComment{
  id:string,
  userId:string,
  fullName:string,
  text:string,
  likes:number,
  postId:string,
  filePath:string,
}
