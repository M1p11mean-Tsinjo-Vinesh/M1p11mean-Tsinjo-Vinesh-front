import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUserFromLocalStorage() {
    const userData = localStorage.getItem('user');
    if(userData) {
      return JSON.parse(userData);
    } else {
      return null;
    }
  }
}
