import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserDataService } from 'src/app/user-data.service';
@Component({
  selector: 'app-write-post',
  templateUrl: './write-post.component.html',
  styleUrls: ['./write-post.component.css'],
})
export class WritePostComponent {
  createPostPhoto: File | null = null;
  @Output() closeWritePost:EventEmitter<void> = new EventEmitter<void>();
  @Output() getUserFeed: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    private userData: UserDataService,
    private httpClient: HttpClient
  ) {}

  setPhoto(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      this.createPostPhoto = inputElement.files[0];
    }
  }

  createPost(postText: NgForm) {
    const formData: FormData = new FormData();
    formData.append('Text', postText.value['text']);
    formData.append(
      'UserId',
      this.userData.getUserId ? this.userData.getUserId.toString() : ''
    );
    formData.append(
      'FileName',
      this.createPostPhoto ? this.createPostPhoto.name.toString() : ''
    );
    formData.append('File', this.createPostPhoto ? this.createPostPhoto : '');
    this.httpClient
      .post(`https://socialmedia1-001-site1.anytempurl.com/api/Post`, formData)
      .subscribe({
        next: (res) => {this.closeWritePost.emit(),this.getUserFeed.emit()},
        error: (err) => {
          alert('faild to add post');
        },
      });
  }
}
