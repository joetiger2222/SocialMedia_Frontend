import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SinglePost } from 'src/app/models/SinglePost.model';
import { UserDataService } from 'src/app/user-data.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SingleComment } from 'src/app/models/SingleComment.model';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  @Input() choosenPost!:SinglePost
  @Output() closeCommentModal:EventEmitter<void> = new EventEmitter<void>();
  createPostPhoto:File|null = null;
  choosenPostComments:SingleComment[]=[]
  constructor(private userData:UserDataService,private httpClient:HttpClient){}


ngOnInit(){
  this.getAllComments();
}



  getAllComments(){
    this.httpClient.get<SingleComment[]>(`https://socialmedia1-001-site1.anytempurl.com/api/Comment/${this.choosenPost.id}`).subscribe({
      next:res=>{
        console.log(res);
        this.choosenPostComments=res;
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




  createComment(commentText:NgForm){
    const formData:FormData=new FormData();
    formData.append('Text',commentText.value['text']);
    formData.append('UserId',this.userData.getUserId?this.userData.getUserId:'')
    formData.append('FileName',this.createPostPhoto?this.createPostPhoto.name:'')
    formData.append('File',this.createPostPhoto?this.createPostPhoto:'')
    formData.append('PostId',this.choosenPost?this.choosenPost.id:'')
    this.httpClient.post<SingleComment>(`https://socialmedia1-001-site1.anytempurl.com/api/Comment/${this.choosenPost.id}`,formData).subscribe({
      next:res=>{
       
        
        this.choosenPostComments.push(res)
      },
      error:err=>{
        console.log(err);
      }
    })
    
    
  }








}
