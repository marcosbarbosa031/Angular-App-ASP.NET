import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/models/photo.model';
import { UserService, AuthService, AlertifyService } from 'src/app/services';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
  }

  public setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(this.authService.getUserId(), photo.id)
      .subscribe(() => {
        this.setNewMainPhoto(photo);
      }, error => {
        this.alertify.error(error);
      });
    }

    private setNewMainPhoto(photo) {
      this.photos.filter(p => p.isMain === true)[0].isMain = false;
      photo.isMain = true;
      this.authService.changeUserPhoto(photo.url);
      this.authService.setCurrentUserPhotoUrl(photo.url);
      localStorage.setItem('user', JSON.stringify(this.authService.getCurrentUser()));
  }
}
