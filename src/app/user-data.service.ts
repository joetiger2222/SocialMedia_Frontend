import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private userIdKey = 'userId';
 

  public get userId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }

  public set userId(value: string | null) {
    if (value) {
      localStorage.setItem(this.userIdKey, value);
    } else {
      localStorage.removeItem(this.userIdKey);
    }
  }


  constructor() { }
}
