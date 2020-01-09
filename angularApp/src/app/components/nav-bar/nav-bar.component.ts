import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services';
import { AlertifyService } from 'src/app/services';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public model: any = {};
  public photoUrl: Observable<string>;

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUserPhoto();
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
    localStorage.removeItem('user');
    this.authService.loggOut();
    this.alertify.message('Logged out!');
    this.router.navigate(['']);
  }

  public loggedIn() {
    return this.authService.loggedIn();
  }

  public getUsername() {
    return this.authService.getUsername();
  }

  public getUserPhoto() {
    this.photoUrl = this.authService.getCurrentPhotoUrl();
  }

}
