import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  public getValues(): Observable<any> {
    return this.http.get<any>(environment.apiURI + '/values');
  }

  public login(body: any): Observable<any> {
    return this.http.post<any>(environment.apiURI + '/auth/login', body)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
          }
        })
      );
  }

  public register(body: any): Observable<any> {
    return this.http.post<any>(environment.apiURI + '/auth/register', body);
  }
}