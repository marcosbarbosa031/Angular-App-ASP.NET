import { Component, OnInit } from '@angular/core';
import { AuthService } from './services';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private jwtHelper = new JwtHelperService();

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.authService.decodeToken(token);
    }

    if (user) {
      this.authService.setCurrentUser(user);
    }
  }

}
