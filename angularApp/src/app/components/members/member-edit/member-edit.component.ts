import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService, UserService, AuthService } from 'src/app/services';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  public user: User;
  public photoUrl: Observable<string>;
  @ViewChild('editForm', {static: true}) editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotifications($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  public updateUser() {
    this.userService.updateUser(this.authService.getUserId(), this.user)
      .subscribe(next => {
        this.alertify.success('Profile updated successfully!');
        this.editForm.reset(this.user);
      }, error => {
        this.alertify.error(error);
      });
  }

  public updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }

  private loadUser() {
    this.user = this.route.snapshot.data.user;
    this.photoUrl = this.authService.getCurrentPhotoUrl();
  }

}
