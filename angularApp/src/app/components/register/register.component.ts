import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services';
import { AlertifyService } from 'src/app/services';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() showRegister = new EventEmitter();
  public model: any = {};
  public registerForm: FormGroup;
  public get f() { return this.registerForm.controls; }

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createRegisterForm();
    console.log('form: ', this.f.password.value);
  }

  public register() {
    // this.authService.register(this.model).subscribe(resp => {
    //   this.alertify.success('User registred successfully!');
    //   this.showRegister.emit(false);
    // }, error => {
    //   this.alertify.error(error);
    // });
    console.log('registerForm: ', this.registerForm.value);
  }

  public cancel() {
    this.showRegister.emit(false);
  }

  private createRegisterForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  public passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true };
  }
}
