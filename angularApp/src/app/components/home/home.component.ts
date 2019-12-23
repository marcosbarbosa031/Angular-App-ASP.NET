import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public values$: Observable<any>;
  public registerMode = false;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.getValues();
  }

  public registerToggle() {
    this.registerMode = !this.registerMode;
  }

  private getValues() {
    this.values$ = this.apiService.getValues();
  }

}
