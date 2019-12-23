import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public model: any = {};

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  public login() {
    this.apiService.login(this.model).subscribe( () => {
      console.log('Successfully logged in!');
    }, error => {
      console.log(error);
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
