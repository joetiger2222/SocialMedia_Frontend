import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SinglePost } from 'src/app/models/SinglePost.model';
import { UserDataService } from 'src/app/user-data.service';

@Component({
  selector: 'app-single-posot',
  templateUrl: './single-posot.component.html',
  styleUrls: ['./single-posot.component.css']
})
export class SinglePosotComponent {
  showCommentsModal: boolean = false;
@Input() singlePost!:SinglePost;
@Output() updateUserFeed:EventEmitter<void>=new EventEmitter<void>();
_userData:any;
showDeletePost: boolean = false;
showEditPost: boolean = false;
constructor(private router:Router,private httpClient:HttpClient,private userData:UserDataService){this._userData=this.userData}



likeOrRemoveLike(postId:string){
  
  this.httpClient.put(`https://socialmedia1-001-site1.anytempurl.com/api/Post/AddOrRemoveLike`,{userId:this.userData.getUserId,postId:postId}).subscribe({
    next:res=>{
      
      this.updateUserFeed.emit();
    },
    error:err=>{
      alert('Failed to update user like')
    }
  })
}




navigateToProflePage(userId:string){
  this.router.navigate(['/profile/'+userId])
}


}
