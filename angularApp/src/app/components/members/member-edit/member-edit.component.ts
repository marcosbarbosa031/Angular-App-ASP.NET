import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/services';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  public user: User;
  @ViewChild('editForm', {static: true}) editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotifications($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  public updateUser() {
    this.alertify.success('Profile updated successfully!');
    this.editForm.reset(this.user);
  }

  private loadUser() {
    this.user = this.route.snapshot.data.user;
  }

}
