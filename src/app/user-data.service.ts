import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private userIdKey = 'userId';
 

  public get userId(): string | null {
    return sessionStorage.getItem(this.userIdKey);
  }

  public set userId(value: string | null) {
    if (value) {
      sessionStorage.setItem(this.userIdKey, value);
    } else {
      sessionStorage.removeItem(this.userIdKey);
    }
  }


  constructor() { }
}
