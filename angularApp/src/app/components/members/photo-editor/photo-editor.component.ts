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

  public deleteUserPhoto(photoId: number) {
    this.alertify.confirm('Are you sure you want to delete this photo?', () => {
      this.userService.deletePhoto(this.authService.getUserId(), photoId)
        .subscribe(() => {
          this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
          this.alertify.success('Photo has been deleted')
        }, error => {
          this.alertify.error('Failed to delete de photo');
        })
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
