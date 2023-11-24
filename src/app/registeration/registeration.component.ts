import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from '../user-data.service';
@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css'],
})
export class RegisterationComponent {
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private userData: UserDataService
  ) {}

  ngOnInit() {
    console.log(this.userData.userId);
    if (this.userData.userId != null) {
      this.router.navigate(['/']);
    }
  }

  login(loginData: NgForm) {
    if (loginData.form.controls['firstName']['invalid']) {
      alert('Please enter a valid First Name');
      return;
    }
    if (loginData.form.controls['lastName']['invalid']) {
      alert('Please enter a valid Last Name');
      return;
    }
    if (loginData.form.controls['username']['invalid']) {
      alert('Please enter a valid Username');
      return;
    }
    if (loginData.form.controls['email']['invalid']) {
      alert('Please enter a valid email');
      return;
    }
    if (loginData.form.controls['password']['invalid']) {
      alert('Please enter a valid password');
      return;
    }
    if (loginData.value.password !== loginData.value.confirmPassword) {
      alert('Password And Confirm Password Must Match');
      return;
    }
    this.httpClient
      .post<{ userId: string }>(
        `https://localhost:7093/api/Authentication/Register`,
        {
          username: loginData.value.username,
          email: loginData.value.email,
          password: loginData.value.password,
          firstName: loginData.value.firstName,
          lastName: loginData.value.lastName,
          roles:["Reader"]
        }
      )
      .subscribe({
        next: (res) => {
          alert('User Created Successfully, Please Login');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert('User Created Successfully, Please Login');
          this.router.navigate(['/login']);
          console.log(err);
        },
      });
  }
}
