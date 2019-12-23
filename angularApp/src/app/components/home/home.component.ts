import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public registerMode = false;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  public showRegister() {
    this.registerMode = true;
  }

  public cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }

}
