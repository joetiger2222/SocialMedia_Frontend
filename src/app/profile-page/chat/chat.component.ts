import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SingleChatMessage } from 'src/app/models/SingleChatMessage.model';
import { UserDataService } from 'src/app/user-data.service';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  chatMessages: SingleChatMessage[] = [];
  @ViewChild('chatContainer', { static: false }) chatContainer!: ElementRef;
  @Input() userId:string='';
  @Output() closeChat:EventEmitter<void> = new EventEmitter<void>();
  _userData!:any
  private hubConnection!: HubConnection;
  constructor(private httpClient:HttpClient,private userData:UserDataService){this._userData=this.userData}

  ngOnInit() {
    this.getMessages();
  }

  getMessages(){
    this.httpClient
      .get<SingleChatMessage[]>(
        `https://socialmedia1-001-site1.anytempurl.com/api/Chat/${this.userData.getUserId}/${this.userId}`
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
      .withUrl("https://socialmedia1-001-site1.anytempurl.com/hubs/chat")
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


  sendMessage(message: string) {
    
    this.httpClient
      .post(`https://socialmedia1-001-site1.anytempurl.com/api/Chat`, {
        date: new Date().toISOString(),
        content: message,
        senderId: this.userData.getUserId,
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
