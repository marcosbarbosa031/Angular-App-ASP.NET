import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user.model';
import { Photo } from '../models/photo.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private decodedToken: any;
  private baseUrl = environment.apiURI;
  private currentUser: User;
  private photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  private currentPhotoUrl = this.photoUrl.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  public getValues(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/values`);
  }

  public login(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, body)
      .pipe(
        map((response: any) => {
          if (response) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user))
            this.decodedToken = this.jwtHelper.decodeToken(response.token);
            this.currentUser = response.user;
            this.changeUserPhoto(this.currentUser.photoUrl);
          }
        })
      );
  }

  public loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public loggOut() {
    this.decodeToken = null;
    this.currentUser = null;
  }

  public register(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/register`, body);
  }

  public decodeToken(token: any) {
    this.decodedToken = this.jwtHelper.decodeToken(token);
  }

  public changeUserPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  public getUsername(): string {
    return this.decodedToken.unique_name;
  }

  public getUserId(): number {
    return this.decodedToken.nameid;
  }

  public getCurrentUser(): User {
    return this.currentUser;
  }

  public setCurrentUser(user: User) {
    this.currentUser = user;
  }

  public setCurrentUserPhotoUrl(photoUrl: string) {
    this.currentUser.photoUrl = photoUrl;
  }

  public getCurrentPhotoUrl(): Observable<string> {
    return this.currentPhotoUrl;
  }

}
