import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services';
import { AlertifyService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public model: any = {};

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public login() {
    this.authService.login(this.model).subscribe( () => {
      this.alertify.success('Successfully logged in!');

    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  public logout() {
    localStorage.removeItem('token');
    this.alertify.message('Logged out!');
    this.router.navigate(['']);
  }

  public loggedIn() {
    return this.authService.loggedIn();
  }

  public getUsername() {
    return this.authService.getUsername();
  }

}
