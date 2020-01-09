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
  @Output() updateUserMainPhoto = new EventEmitter<string>();

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
        this.updateCurrentUser();
      }, error => {
        this.alertify.error(error);
      });
    }

    private setNewMainPhoto(photo) {
      this.photos.filter(p => p.isMain === true)[0].isMain = false;
      photo.isMain = true;
      this.updateUserMainPhoto.emit(photo.url);
  }

  private updateCurrentUser() {
    this.userService.getUser(this.authService.getUserId())
      .subscribe(u => {
        this.authService.setCurrentUser(u);
        localStorage.setItem('user', JSON.stringify(u));
      });
  }
}
