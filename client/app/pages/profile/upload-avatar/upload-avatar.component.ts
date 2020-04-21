import { Component, OnInit, Input, NgZone } from '@angular/core';
import {
  FileUploader,
  FileUploaderOptions,
  ParsedResponseHeaders
} from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { UserService, AuthenticationService } from '@app/services';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/models';

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.css']
})
export class UploadAvatarComponent implements OnInit {
  @Input()
  responses: Array<any>;

  user: User = null;
  public hasBaseDropZoneOver = false;
  public uploader: FileUploader;
  private isUploaded = false;

  constructor(
    private cloudinary: Cloudinary,
    private zone: NgZone,
    private as: AuthenticationService,
    private us: UserService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) { }


  ngOnInit(): void {

    this.activeRouter.parent.params.subscribe(params => {
      const id = params.id;
      this.us.getById(id).subscribe(x => {
        this.user = x;
      });
      this.responses = [];
    });

    // Create the file uploader, wire it to upload to your account
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${
        this.cloudinary.config().cloud_name
      }/upload`,
      // Upload files automatically upon addition to upload queue
      autoUpload: true,
      // Use xhrTransport in favor of iframeTransport
      isHTML5: true,
      // Calculate progress independently for each uploaded file
      removeAfterUpload: true,
      // XHR request headers
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };
    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Add Cloudinary's unsigned upload preset to the upload form
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      // Upload to a custom folder
      // Note that by default, when uploading via the API, folders are not automatically created in your Media Library.
      // In order to automatically create the folders based on the API requests,
      // please go to your account upload settings and set the 'Auto-create folders' option to enabled.
      form.append('folder', 'angular_sample');

      // Add file to upload
      form.append('file', fileItem);

      // Use default "withCredentials" value for CORS requests
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    // Insert or update an entry in the responses array
    const upsertResponse = fileItem => {
      // Run the update in a custom zone since for some reason change detection isn't performed
      // as part of the XHR request to upload the files.
      // Running in a custom zone forces change detection
      this.zone.run(() => {
        // Update an existing entry if it's upload hasn't completed yet

        // Find the id of an existing item
        const existingId = this.responses.reduce((prev, current, index) => {
          if (current.file.name === fileItem.file.name && !current.status) {
            return index;
          }
          return prev;
        }, -1);

        if (existingId > -1) {
          // Update existing item with new data
          this.responses[existingId] = Object.assign(
            this.responses[existingId],
            fileItem
          );
        } else {
          // Create new response
          this.responses.push(fileItem);
        }
      });
    };

    // Update model on completion of uploading a file
    this.uploader.onCompleteItem = (
      item: any,
      response: string,
      status: number,
      headers: ParsedResponseHeaders
    ) => {
      // put image into users table
      const avatarPath = JSON.parse(response).public_id;

      this.us.uploadAvatar(this.user.id, avatarPath).subscribe(
          () => {
            this.user.avatar = avatarPath;
            this.as.refresh(this.user);
            this.router.navigate(['/profile/' + this.user.id]);
          },
          err => {
            console.error(err);
          }
        );

      upsertResponse({
        file: item.file,
        status,
        data: JSON.parse(response)
      });
    };

    // Update model on upload progress event
    this.uploader.onProgressItem = (fileItem: any, progress: any) => {

      upsertResponse({
        file: fileItem.file,
        progress,
        data: {}
      });
    };
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
}
