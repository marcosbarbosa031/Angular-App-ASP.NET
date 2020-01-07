import { Component, OnInit, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services';
import { Photo } from 'src/app/models/photo.model';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @Input() photos: Photo[];
  public uploader: FileUploader;
  public hasBaseDropZoneOver = false;
  private baseUrl = environment.apiURI;

  constructor(
    private authService: AuthService
  ) {
    this.initializeUploader();
  }

  ngOnInit() {}

  public fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  private initializeUploader(): void {
    this.uploader = new FileUploader({
      url: `${this.baseUrl}/users/${this.authService.getUserId()}/photos`,
      authToken: `Bearer ${localStorage.getItem('token')}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = file => file.withCredentials = false;
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };

        this.photos.push(photo);
      }
    };
  }

}
