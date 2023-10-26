import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  baseUrl= "http://localhost:8080";
  constructor(private httpClient: HttpClient) { }

  registerUser(user: User):Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}/register`,user);
  }

  loginUser(user:User):Observable<Object> {
    const result =  this.httpClient.post(`${this.baseUrl}/login`,user);
    console.log('resultat',result);
    return result;
  }
  
  login() : Promise<any>{
    return new Promise((resolve) => {
      localStorage.setItem('loggedIn', 'true');
      resolve(true);
    })
  }
  
  isLoggedIn() : boolean{
    return !!localStorage.getItem('loggedIn');
  }
  
}
