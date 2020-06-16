import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Help, HelpResponse, User } from '@app/models';
import { ResponseService, AuthenticationService } from '@app/services';
import { Router } from '@angular/router';
import { ModalService } from '@app/shared/components';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import * as moment from 'moment';

@Component({
    selector: 'app-helps-detail-responses',
    templateUrl: './helps-detail-responses.component.html',
    styleUrls: ['./helps-detail-responses.component.scss']
})
export class HelpsDetailResponsesComponent implements OnInit {

    @Input() help: Help;
    // @Input() currentUser: User;

    // responses
    isHelpCreator: boolean;
    isResponderAccepted: boolean;
    hasUserResponded: boolean;
    isUserAccepted: boolean;
    isAtLeastOneResponseAccepted: boolean = false;

    // feedback
    stars: number[] = [1, 2, 3, 4, 5];
    selectedValue: number;
    message = '';

    // image
    @Input() responses: Array<any> = [];
    public imageUploaded = false;
    public hasBaseDropZoneOver = false;
    public uploader: FileUploader;
    uploadedImage: string = null;

    constructor(
        private rs: ResponseService,
        private router: Router,
        private modalService: ModalService,
        private as: AuthenticationService,
        private cloudinary: Cloudinary,
        private ngZone: NgZone) { }

    ngOnInit() {
        this.checkHelpCreator();
        this.hasUserResponded = this.checkUserResponse(this.help.responses, this.as.currentUserValue.id);
        this.isUserAccepted = this.checkUserAccept(this.help.responses);
        this.isResponderAccepted = this.checkResponderAccepted(this.help.responses, this.as.currentUserValue.id);
        this.isAtLeastOneResponseAccepted = this.checkAtLeastOneResponseAccepted(this.help);
        this.initImageUploader();
    }

    initImageUploader() {
        // init image - create the file uploader, wire it to upload to your account
        const uploaderOptions: FileUploaderOptions = {
            url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
            // Upload files automatically upon addition to upload queue
            autoUpload: true,
            // Use xhrTransport in favor of iframeTransport
            isHTML5: true,
            // Calculate progress independently for each uploaded file
            removeAfterUpload: true,
            // XHR request headers
            headers: [{ name: 'X-Requested-With', value: 'XMLHttpRequest' }]
        };
        this.uploader = new FileUploader(uploaderOptions);
        this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
            // Add Cloudinary's unsigned upload preset to the upload form
            form.append('upload_preset', 'preset_review');
            form.append('file', fileItem);

            // Use default 'withCredentials' value for CORS requests
            fileItem.withCredentials = false;
            return { fileItem, form };
        };

        // Insert or update an entry in the responses array
        const upsertResponse = fileItem => {
            // Run the update in a custom zone since for some reason change detection isn't performed
            // as part of the XHR request to upload the files.
            // Running in a custom zone forces change detection
            this.ngZone.run(() => {
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
              this.imageUploaded = true;
            });
        };

        // Update model on completion of uploading a file
        this.uploader.onCompleteItem = (
            item: any,
            response: string,
            status: number,
            headers: ParsedResponseHeaders
        ) => upsertResponse({
            file: item.file,
            status,
            data: JSON.parse(response)
        });

        // Update model on upload progress event
        this.uploader.onProgressItem = (fileItem: any, progress: any) => upsertResponse({
            file: fileItem.file,
            progress,
            data: {}
        });
    }

    toggleImgUploader() {
        this.imageUploaded = !this.imageUploaded;
    }

    // Delete an uploaded image
    deleteImage = function (data: any, index: number) {
        const url = `https://api.cloudinary.com/v1_1/${
            this.cloudinary.config().cloud_name
            }/delete_by_token`;
        console.log(url, 'url');
        const headers = [{
            name: 'X-Requested-With',
            value: 'XMLHttpRequest'
        }];
        const options = { headers };
        console.log(data, 'data');
        const body = {
            token: data.delete_token
        };
        console.log(body, 'body');
        this.http.post(url, body, options).subscribe(response => {
            // Remove deleted item for responses
            this.responses.splice(index, 1);
        });
        this.imageUploaded = !this.imageUploaded;
    };

    fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    getFileProperties(fileProperties: any) {
        // Transforms Javascript Object to an iterable to be used by *ngFor
        if (!fileProperties) {
            return null;
        }
        return Object.keys(fileProperties).map(key => ({
            key,
            value: fileProperties[key]
        }));
    }

    checkHelpCreator(): void {
      this.isHelpCreator = this.as.currentUserValue.id === this.help.creator.id;
    }

    checkUserResponse(reponses: HelpResponse[], userId: number) {
        return reponses.some(response => {
            return response.responder.id === userId;
        });
    }

    checkUserAccept(reponses: HelpResponse[]) {
        return reponses.some(response => {
            return response.accepted === true;
        });
    }

    checkResponderAccepted(reponses: HelpResponse[], userId: number) {
        return reponses.some((response) => {
            return response.accepted === true && response.responder.id === userId;
        });
    }

    checkAtLeastOneResponseAccepted(help: Help) {
        return help.responses.some(response => {
            return response.accepted === true;
        });
    }

    accept(response: HelpResponse): void {
        this.rs.acceptResponse(response).subscribe(() => {
            response.accepted = true;
            if (this.help.type.code != 'COH') {
                this.help.accepted = true;
            }
            this.isUserAccepted = this.checkUserAccept(this.help.responses);
            this.isAtLeastOneResponseAccepted = this.checkAtLeastOneResponseAccepted(this.help);
        });
    }

    cancel(response: HelpResponse): void {
        this.rs.cancelResponse(response).subscribe(() => {
            response.accepted = false;
            this.help.accepted = false;
            this.isUserAccepted = this.checkUserAccept(this.help.responses);
            this.isAtLeastOneResponseAccepted = this.checkAtLeastOneResponseAccepted(this.help);
        });
    }

    review(response: HelpResponse): void {
        if (this.isHelpCreator) {
            const i = this.responses.length - 1;
            const image = this.responses[i];
            response.imageReviewCreator = image === undefined ? null : image.data.public_id;
            response.messageCreator = this.message;
            response.ratingCreator = this.selectedValue;

            // if is a collective help, set all accepted responses as reviewed
            if (this.help.type.code == 'COH') {
                  this.rs.collectiveFeedback(response).subscribe(() => {
                      for (var res in this.help.responses.filter(x => x.accepted == true)) {
                          this.help.responses[res].reviewed = true;
                          this.help.responses[res].imageReviewCreator = image === undefined ? null : image.data.public_id;
                          this.help.responses[res].messageCreator = this.message;
                          this.help.responses[res].ratingCreator = this.selectedValue;
                      }
                      this.help.reviewed = true;
                      this.help.completed = true;
                      this.as.currentUserValue.likehelps += 3;
                      this.modalService.close('modal-complete-' + response.id);
                      this.as.refresh(this.as.currentUserValue);
                      this.router.navigate(['/helps/', this.help.id]);
                  })
              }
              else {
                  this.rs.creatorFeedback(response).subscribe(() => {
                      response.reviewed = true;
                      this.help.reviewed = true;
                      this.modalService.close('modal-complete-' + response.id);
                      this.as.refresh(this.as.currentUserValue);
                      this.router.navigate(['/helps/', this.help.id]);
                  });
            }
        }
    }

    complete(response: HelpResponse): void {
        if (this.isResponderAccepted) {
            const i = this.responses.length - 1;
            const image = this.responses[i];
            response.imageReviewResponder = image === undefined ? null : image.data.public_id;
            response.messageResponder = this.message;
            response.ratingResponder = this.selectedValue;

            this.rs.completeResponse(response).subscribe(() => {
                response.completed = true;
                if (this.help.type.code != 'COH') {
                    this.as.currentUserValue.likehelps++;
                }
                this.help.completed = true;
                this.modalService.close('modal-complete-' + response.id);
                this.router.navigate(['/helps/', this.help.id]);
            });
        }
    }

    deleteResponse(response: HelpResponse): void {
        this.rs.deleteResponse(response).subscribe(() =>
            this.router.navigate(['/helps/, model.id'])
        );
    }

    openModal(id: string) {
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

    countStar(stars: number) {
        this.selectedValue = stars;
    }

    canChat(r: HelpResponse): boolean {
        const chatEnabled = 
            !this.help.completed &&
            (
                this.help.accepted ||
                (this.help.type.code == 'COH' && this.isAtLeastOneResponseAccepted)
            ) && 
            (
                this.as.currentUserValue.id == this.help.idCreator || 
                (this.as.currentUserValue.id == r.idResponder && r.accepted)
            );
        return chatEnabled;
    }

    canReview(r: HelpResponse): boolean {
        const reviewEnabled = 
            this.isResponderAccepted &&
            r.reviewed && 
            !r.completed && 
            r.idResponder == this.as.currentUserValue.id;
        return reviewEnabled;
    }


    canSeeResponse(r: HelpResponse) {
        const responseDisplayed =
            (
                (
                    !this.isUserAccepted && this.help.type.code != 'COH'
                ) ||
                r.accepted
            ) ||
            this.help.type.code == 'COH';
        return responseDisplayed;
    }

    canSeeResponse2(r: HelpResponse): boolean {
        const responseDisplayed =
            r.accepted || 
            r.idResponder === this.as.currentUserValue.id || 
            this.isHelpCreator || 
            (this.help.type.code == 'COH');
        return responseDisplayed;
    }

    isExpired(help: Help): boolean {
        const now = moment.utc();
        const then = moment.utc(help.dateEndValidity);
        const timespan = then.diff(now);
        return timespan < 0;
    }

    canRespond() {
        return !this.isExpired(this.help) && !this.hasUserResponded && !this.isHelpCreator;
    }

}
