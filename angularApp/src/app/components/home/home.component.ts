import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services';
import { environment } from 'src/environments/environment';

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
    console.log('URI: ', environment.apiURI);
  }

  public showRegister() {
    this.registerMode = true;
  }

  public cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }

}
