import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserStorageService } from '../user-storage.service';
import { jwtDecode } from "jwt-decode";
const BASIC_URL = 'http://localhost:8080/api/auth/';
const TOKEN='token';
const USER='ecom-user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient,private userStorageService:UserStorageService) { }

    
login(email: string, password: string): Observable<boolean> {
  const body = { email, password };

  return this.http.post(BASIC_URL + "login", body, { observe: 'response' }).pipe(
    map((response: any) => {
      if (response.status === 200) {
        const token = response.body.token;
        try {
          const decoded = jwtDecode(token);
          console.log('Token is valid', decoded);
          
          const user = response.body;
          const authStatus = response.body.authStatus;
          this.userStorageService.saveToken(token);
          this.userStorageService.saveUser(user);
          return true;
        } catch (err) {
          console.error('Token is invalid', err);
          return false;
        }
      } else {
        return false;
      }
    })
  );
}

  register(signupRequest:any):Observable<any>{
    return this.http.post(BASIC_URL+"sign-up",signupRequest);
  }

}
