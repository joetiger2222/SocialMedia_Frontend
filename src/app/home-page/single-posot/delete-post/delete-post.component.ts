import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css']
})
export class DeletePostComponent {
  @Input() postId: string=''
@Output() closeDeleteButton:EventEmitter<void> = new EventEmitter<void>();
  constructor(private httpClient:HttpClient){}

deletePost(){
  this.httpClient.delete(`https://socialmedia1-001-site1.anytempurl.com/api/Post/${this.postId}`).subscribe({
    next:res=>{
      window.location.reload();
    },
    error:err=>{
      alert('error happened when deleting post')
    }
  })
}

}
