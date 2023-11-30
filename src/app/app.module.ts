import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { NgModel,NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { WritePostComponent } from './home-page/write-post/write-post.component';
import { SinglePosotComponent } from './home-page/single-posot/single-posot.component';
import { CommentsComponent } from './home-page/comments/comments.component';
import { ChatComponent } from './profile-page/chat/chat.component';
import { DeletePostComponent } from './home-page/single-posot/delete-post/delete-post.component';
import { EditPostComponent } from './home-page/single-posot/edit-post/edit-post.component';

const appRoutes:Routes=[
  {path:'',component: LoginComponent},
  {path:'homePage',component: HomePageComponent},
  {path:'profile/:id',component: ProfilePageComponent},
  {path:'register',component: RegisterationComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    LoginComponent,
    ProfilePageComponent,
    RegisterationComponent,
    WritePostComponent,
    SinglePosotComponent,
    CommentsComponent,
    ChatComponent,
    DeletePostComponent,
    EditPostComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
