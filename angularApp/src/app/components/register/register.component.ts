import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public model: any = {};

  constructor() { }

  ngOnInit() {
  }

  public register() {
    console.log(this.model);
  }

  public cancel() {
    console.log('cancel!');
  }

}
