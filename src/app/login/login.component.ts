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
  constructor(private  router:Router,private httpClient:HttpClient,private userData:UserDataService){}

  ngOnInit(){
    console.log(this.userData.userId)
    if(this.userData.userId!=null){
      this.router.navigate(['/'])
    }
  }

  login(loginData:NgForm){
    if(loginData.form.controls['email']['invalid']){
      alert('Please enter a valid email')
      return;
    }
    if(loginData.form.controls['password']['invalid']){
      alert('Please enter a valid password')
      return;
    }
    this.httpClient.post<{userId:string}>(`https://socialmedia1-001-site1.anytempurl.com/api/Authentication/Login/User`,loginData.value).subscribe({
      next:res=>{
        this.userData.userId=res.userId;
        
        this.router.navigate(['/']);
      },
      error:err=>{
        console.log(err);
        
      }
    })
    
  }


}
