import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private decodedToken: any;
  private baseUrl = environment.apiURI;

  constructor(
    private http: HttpClient
  ) { }

  public getValues(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/values');
  }

  public login(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/auth/login', body)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
          }
        })
      );
  }

  public loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public register(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/auth/register', body);
  }

  public decodeToken(token: any) {
    this.decodedToken = this.jwtHelper.decodeToken(token);
  }

  public getUsername() {
    return this.decodedToken.unique_name;
  }
}
