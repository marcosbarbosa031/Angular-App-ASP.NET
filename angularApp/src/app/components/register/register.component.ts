import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services';;
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() showRegister = new EventEmitter();
  public model: any = {};

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
  }

  public register() {
    this.authService.register(this.model).subscribe(resp => {
      this.alertify.success('User registred successfully!')
      this.showRegister.emit(false);
    }, error => {
      this.alertify.error(error);
    });
  }

  public cancel() {
    this.showRegister.emit(false);
  }

}
