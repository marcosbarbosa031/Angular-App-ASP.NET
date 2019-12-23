import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() showRegister = new EventEmitter();
  public model: any = {};

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  public register() {
    this.apiService.register(this.model).subscribe(resp => {
      this.showRegister.emit(false);
    }, error => {
      console.error(error);
    });
  }

  public cancel() {
    this.showRegister.emit(false);
  }

}
