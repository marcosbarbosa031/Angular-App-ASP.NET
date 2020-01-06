import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public registerMode = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    console.log('token: ', this.authService.getToken());
  }

  public showRegister() {
    this.registerMode = true;
  }

  public cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }

}
