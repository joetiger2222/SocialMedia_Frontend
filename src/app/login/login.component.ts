import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from '../user-data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading :boolean = false;

  constructor(private  router:Router,private httpClient:HttpClient,private userData:UserDataService){}


  login(loginData:NgForm){
    if(loginData.form.controls['email']['invalid']){
      alert('Please enter a valid email')
      return;
    }
    if(loginData.form.controls['password']['invalid']){
      alert('Please enter a valid password')
      return;
    }
    this.loading=true
    this.httpClient.post<{userId:string}>(`https://socialmedia1-001-site1.anytempurl.com/api/Authentication/Login/User`,loginData.value).subscribe({
      next:res=>{
        // this.userData.userId(res.userId)
        this.userData.setUserId=res.userId;
        this.router.navigate(['/homePage']);
        this.loading=false
      },
      error:err=>{
        console.log(err);
        this.loading=false
      }
    })
    
  }


}
