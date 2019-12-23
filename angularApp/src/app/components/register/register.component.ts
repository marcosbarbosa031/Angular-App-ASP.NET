import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  @Output() showRegister = new EventEmitter();
  public model: any = {};

  constructor() { }

  ngOnInit() {
  }

  public register() {
    console.log(this.model);
  }

  public cancel() {
    this.showRegister.emit(false);
  }

}
