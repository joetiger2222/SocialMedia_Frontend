import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router:Router,private userData:UserDataService){}
  goToLogin(){
    this.userData.setUserId='';
    this.router.navigate(['/']);
   
  }
  checkLogin(){
    if(this.userData.getUserId!==null){
      return true;
    }
    return false;
  }

  goToProfilePage(){
    this.router.navigate(['/profile/'+this.userData.getUserId])
    
  }

  goToHomePage(){
    this.router.navigate(['/homePage']);
  }
}
