import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {
  public values$: Observable<any>;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.getValues();
  }

  private getValues() {
    this.values$ = this.apiService.getValues();
  }

}
