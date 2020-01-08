import { Component, OnInit, Input } from '@angular/core';
import { Photo } from 'src/app/models/photo.model';
import { UserService, AuthService, AlertifyService } from 'src/app/services';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Input() user: User;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
  }

  public setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(this.authService.getUserId(), photo.id)
      .subscribe(next => {
        this.user.photoUrl = photo.url;
      }, error => {
        this.alertify.error(error);
      });
  }
}
