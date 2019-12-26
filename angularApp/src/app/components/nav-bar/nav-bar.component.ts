import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public model: any = {};

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
  }

  public login() {
    this.authService.login(this.model).subscribe( () => {
      this.alertify.success('Successfully logged in!');
    }, error => {
      this.alertify.error(error);
    });
  }

  public logout() {
    localStorage.removeItem('token');
    console.log('Logged out!');
  }

  public loggedIn() {
    return !!localStorage.getItem('token');
  }

}
