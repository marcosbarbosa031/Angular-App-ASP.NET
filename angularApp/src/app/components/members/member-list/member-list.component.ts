import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  public users: User[];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.route.snapshot.data.users;
  }

}
