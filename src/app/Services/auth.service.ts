import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { CookieService } from 'ngx-cookie-service';



@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
    provider: any;

  constructor(private http: HttpClient ,private cookieService: CookieService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  token: string = '';
  refreshToken: string = '';
  role: string = '';
  users!:User

  setToken(token: string, refreshToken: string, role: string) {
    this.token = token;
    this.refreshToken = refreshToken;
    this.role = role;
  }
  

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<any>(`${environment.backendHost}/api/login`, { email, password })
      .pipe(map(user => {
        if (user && user.token) { // Check if the token is present
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          
          return user;
        }
        return null;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.cookieService.delete('jwt'); // Utiliser delete au lieu de removeItem
    this.currentUserSubject.next(null!);
  }


  registerUser(user: any): Observable<any> {
    return this.http.post(`${environment.backendHost}/api/register1`, user);
  }
}
