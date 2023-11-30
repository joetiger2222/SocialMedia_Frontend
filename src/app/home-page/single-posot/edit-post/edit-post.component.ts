import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SinglePost } from 'src/app/models/SinglePost.model';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent {
@Input() post!:SinglePost
@Output() closeEditPost:EventEmitter<void> = new EventEmitter<void>();
constructor(private httpClient:HttpClient){}
editPost(event:HTMLTextAreaElement){
  if(event){
    
    this.httpClient.put(`https://socialmedia1-001-site1.anytempurl.com/api/Post/${this.post.id}`,{text:event.value,likes:this.post.likes}).subscribe({
      next:res=>{
        this.closeEditPost.emit();
        window.location.reload();
      },
      error:err=>{
        console.log(err);
      }
    })
  }
  
}

}
