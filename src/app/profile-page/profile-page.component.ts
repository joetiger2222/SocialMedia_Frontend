import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent {
  @ViewChild('chatContainer', { static: false }) chatContainer!: ElementRef;
  posts!: SinglePost[];
  choosenPostComments!: SingleComment[];
  choosenPostToComment!: SinglePost;
  showCreatePost: boolean = false;
  showAddComment: boolean = false;
  choosenPost!: SinglePost;
  createPostPhoto: File | null = null;
  userId!: string;
  friendsCondition!: string;
  readonly _userData!: UserDataService;
  showChatModel: boolean = false;
  chatMessages: SingleChatMessage[] = [];
  private hubConnection!: HubConnection;
  constructor(
    private userData: UserDataService,
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this._userData = userData;
    
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });
    this.getUserPosts();
    if (this.userData.userId !== this.userId) {
      this.checkFriends();
    }
    
   
  
  }

  getUserPosts() {
    this.httpClient
      .get<SinglePost[]>(`https://localhost:7093/api/Post/${this.userData.userId}/${this.userId}`)
      .subscribe({
        next: (res) => {
        
          this.posts = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  checkFriends() {
    this.httpClient
      .get<{ isFriends: boolean }>(
        `https://localhost:7093/IsFriends/${this.userData.userId}/${this.userId}`
      )
      .subscribe({
        next: (res) => {
         
          if (res.isFriends === false) {
            this.checkFriendReques();
          } else {
            this.friendsCondition = 'Friends';
          }
        
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  checkFriendReques() {
    this.httpClient
      .get<{ isFriendReques: string }>(
        `https://localhost:7093/IsFriendReques/${this.userData.userId}/${this.userId}`
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.friendsCondition = res.isFriendReques;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  likeOrRemoveLike(postId: string) {
    this.httpClient
      .put(`https://localhost:7093/api/Post/AddOrRemoveLike`, {
        userId: this.userData.userId,
        postId: postId,
      })
      .subscribe({
        next: (res) => {
          this.getUserPosts();
        },
        error: (err) => {
          alert('Failed to update user like');
        },
      });
  }
  setPhoto(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      this.createPostPhoto = inputElement.files[0];
    }
  }
  openCommentModel(post: SinglePost) {
    this.choosenPostToComment = post;
    this.showAddComment = true;
    this.choosenPost = post;
    this.choosenPostComments = [];
    this.httpClient
      .get<SingleComment[]>(`https://localhost:7093/api/Comment/${post.id}`)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.choosenPostComments = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  closeCommentModal() {
    this.showAddComment = false;
  }

  createComment(commentText: NgForm) {
    const formData: FormData = new FormData();
    formData.append('Text', commentText.value['text']);
    formData.append('UserId', this.userData.userId ? this.userData.userId : '');
    formData.append(
      'FileName',
      this.createPostPhoto ? this.createPostPhoto.name : ''
    );
    formData.append('File', this.createPostPhoto ? this.createPostPhoto : '');
    formData.append(
      'PostId',
      this.choosenPostToComment ? this.choosenPostToComment.id : ''
    );
    this.httpClient
      .post<SingleComment>(
        `https://localhost:7093/api/Comment/${this.choosenPostToComment.id}`,
        formData
      )
      .subscribe({
        next: (res) => {
         
          this.choosenPostComments.push(res)
        },
        error: (err) => {
          console.log(err);
        },
      });
    this.httpClient
      .get<SingleComment[]>(
        `https://localhost:7093/api/Comment/${this.choosenPostToComment.id}`
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.choosenPostComments = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  navigateToProflePage(userId: string) {
    this.router.navigate(['/profile/' + userId]);
  }

  sendFriendRequest() {
    this.httpClient
      .post(`https://localhost:7093/api/FriendRequest`, {
        recieverId: this.userId,
        senderId: this._userData.userId,
      })
      .subscribe({
        next: (res) => {
          this.checkFriendReques();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  cancelFriendRequest() {
    this.httpClient
      .delete(
        `https://localhost:7093/api/FriendRequest/RejectOrCancelFriendRequest/${this.userData.userId}/${this.userId}`
      )
      .subscribe({
        next: (res) => {
          this.checkFriends();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  acceptFriendRequest() {
    this.httpClient
      .post(
        `https://localhost:7093/api/FriendRequest/AcceptFriendRequest/${this.userData.userId}/${this.userId}`,
        {}
      )
      .subscribe({
        next: (res) => {
          this.checkFriends();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  openChatModel() {
    this.showChatModel = true;
    this.httpClient
      .get<SingleChatMessage[]>(
        `https://localhost:7093/api/Chat/${this.userData.userId}/${this.userId}`
      )
      .subscribe({
        next: (res) => {
          this.chatMessages = res;
        },
        error: (err) => {
          console.log(err);
        },
      });

      this.hubConnection= new HubConnectionBuilder()
      .withUrl("https://localhost:7093/hubs/chat")
      .withAutomaticReconnect()
      .build();
  
      this.hubConnection.start()
        .then(() => {
          this.hubConnection.on('ReceiveMessage', (message) => {
            this.chatMessages.push(message);
          });
        })
        .catch(err => console.error('Error while establishing connection :(',err));

       


  }

  public scrollChatContainerToBottom() {
    if (this.chatContainer) {
     
      const containerElement: HTMLElement = this.chatContainer.nativeElement;
      containerElement.scrollTop = containerElement.scrollHeight;
    }
  }

  closeChatModel() {
    this.showChatModel = false;
  }

  sendMessage(message: string) {
    
    this.httpClient
      .post(`https://localhost:7093/api/Chat`, {
        date: new Date().toISOString(),
        content: message,
        senderId: this.userData.userId,
        recieverId: this.userId,
      })
      .subscribe({
        next: (res) => {
          this.scrollChatContainerToBottom();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
interface SinglePost {
  id: string;
  text: string;
  likes: number;
  userId: string;
  filePath: string;
  isLiked: boolean;
  fullName: string;
}

interface SingleComment {
  id: string;
  userId: string;
  fullName: string;
  text: string;
  likes: number;
  postId: string;
  filePath: string;
}

interface SingleChatMessage {
  id: string;
  content: string;
  date: string;
  senderId: string;
  recieverId: string;
}
