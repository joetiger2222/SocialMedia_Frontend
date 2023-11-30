import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { SinglePost } from '../models/SinglePost.model';
import { SingleComment } from '../models/SingleComment.model';
import { SingleChatMessage } from '../models/SingleChatMessage.model';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent {
  @ViewChild('chatContainer', { static: false }) chatContainer!: ElementRef;
  posts!: SinglePost[];
  userId!: string;
  friendsCondition!: string;
  readonly _userData!: UserDataService;
  showChatModel: boolean = false;
  chatMessages: SingleChatMessage[] = [];
  private hubConnection!: HubConnection;
  constructor(
    private userData: UserDataService,
    private httpClient: HttpClient,
    private route: ActivatedRoute
  ) {
    this._userData = userData;
    
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });
    this.getUserPosts();
    if (this.userData.getUserId !== this.userId) {
      this.checkFriends();
    }
    
   
  
  }

  getUserPosts() {
    this.httpClient
      .get<SinglePost[]>(`https://socialmedia1-001-site1.anytempurl.com/api/Post/${this.userData.getUserId}/${this.userId}`)
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
        `https://socialmedia1-001-site1.anytempurl.com/IsFriends/${this.userData.getUserId}/${this.userId}`
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
        `https://socialmedia1-001-site1.anytempurl.com/IsFriendReques/${this.userData.getUserId}/${this.userId}`
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



  sendFriendRequest() {
    this.httpClient
      .post(`https://socialmedia1-001-site1.anytempurl.com/api/FriendRequest`, {
        recieverId: this.userId,
        senderId: this._userData.getUserId,
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
        `https://socialmedia1-001-site1.anytempurl.com/api/FriendRequest/RejectOrCancelFriendRequest/${this.userData.getUserId}/${this.userId}`
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
        `https://socialmedia1-001-site1.anytempurl.com/api/FriendRequest/AcceptFriendRequest/${this.userData.getUserId}/${this.userId}`,
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



}




