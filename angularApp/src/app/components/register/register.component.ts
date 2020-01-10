import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services';
import { AlertifyService } from 'src/app/services';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() showRegister = new EventEmitter();
  public model: any = {};
  public registrationForm: FormGroup;
  public get f() { return this.registrationForm.controls; }

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.createForm();
    console.log('form: ', this.f.password.value);
  }

  public register() {
    // this.authService.register(this.model).subscribe(resp => {
    //   this.alertify.success('User registred successfully!');
    //   this.showRegister.emit(false);
    // }, error => {
    //   this.alertify.error(error);
    // });
    console.log('registerForm: ', this.registrationForm.value);
  }

  public cancel() {
    this.showRegister.emit(false);
  }


  private createForm() {
    this.registrationForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)] ),
      confirmPassword: new FormControl('', Validators.required)
    }, this.passwordMatchValidator);
  }

  public passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true };
  }
}
