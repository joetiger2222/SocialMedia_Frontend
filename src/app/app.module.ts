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
    RegisterationComponent
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
