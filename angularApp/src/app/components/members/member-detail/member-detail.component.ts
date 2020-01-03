import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  public user: User;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  private loadUser() {
    this.user = this.route.snapshot.data.user;
  }
}
