import { Component, OnInit, Input } from '@angular/core';
import { Help, HelpResponse, User } from '@app/models';
import { ResponseService, AuthenticationService } from '@app/services';
import { Router } from '@angular/router';
import { ModalService } from '@app/shared/components';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { BachecaPost } from '@app/models/bachecaPost';

@Component({
    selector: 'app-helps-detail-responses',
    templateUrl: './helps-detail-responses.component.html',
    styleUrls: ['./helps-detail-responses.component.scss'],
    standalone: false
})
export class HelpsDetailResponsesComponent implements OnInit {

    @Input() help: Help;

    // responses
    isHelpCreator: boolean;
    isResponderAccepted: boolean;
    hasUserResponded: boolean = false;
    isUserAccepted: boolean;
    isAtLeastOneResponseAccepted: boolean = false;
    canAccept: boolean = false;

    // feedback
    stars: number[] = [1, 2, 3, 4, 5];
    selectedValue: number;
    message = '';

    // image
    @Input() responses: Array<any> = [];
    public imageUploaded = false;
    public uploading = false;
    uploadedImage: string = null;

    constructor(
        private rs: ResponseService,
        private router: Router,
        private modalService: ModalService,
        private as: AuthenticationService,
        private http: HttpClient) { }

    ngOnInit() {
        this.checkHelpCreator();
        this.hasUserResponded = this.checkUserResponse(this.help.responses, this.as.currentUserValue.id);
        this.isUserAccepted = this.checkUserAccept(this.help.responses);
        this.isResponderAccepted = this.checkResponderAccepted(this.help.responses, this.as.currentUserValue.id);
        this.isAtLeastOneResponseAccepted = this.checkAtLeastOneResponseAccepted(this.help);
        if(this.as.currentUserValue.likehelps >= this.help.likehelps) this.canAccept = true;
        else this.canAccept = false;
        console.log(this.help)
    }

    onFileSelected(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('upload_preset', 'preset_review');
        formData.append('folder', 'angular_sample');
        formData.append('tags', 'myphotoalbum');
        formData.append('file', file);
        this.uploading = true;
        this.http.post('https://api.cloudinary.com/v1_1/hwbyvepex/upload', formData).subscribe(
            (response: any) => {
                this.uploading = false;
                this.imageUploaded = true;
                this.uploadedImage = response.public_id;
                this.responses.push({ file: { name: file.name }, status: 200, data: response });
            },
            err => { this.uploading = false; console.error(err); }
        );
    }

    toggleImgUploader() {
        this.imageUploaded = !this.imageUploaded;
    }

    // Delete an uploaded image
    deleteImage = function (data: any, index: number) {
        const url = `https://api.cloudinary.com/v1_1/hwbyvepex/delete_by_token`;
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

    /* to delete */
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
            /* to delete */
            this.isUserAccepted = this.checkUserAccept(this.help.responses);
            this.isAtLeastOneResponseAccepted = this.checkAtLeastOneResponseAccepted(this.help);
        });
    }

    cancel(response: HelpResponse): void {
        this.rs.cancelResponse(response).subscribe(() => {
            response.accepted = false;
            this.help.accepted = false;
            /* to delete */
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
            response.ratingCreator = this.selectedValue ? this.selectedValue : 1;

            // if is a collective help, set all accepted responses as reviewed
            if (this.help.type.code == 'COH') {
                  this.rs.collectiveFeedback(response).subscribe(() => {
                      for (var res in this.help.responses.filter(x => x.accepted == true)) {
                          this.help.responses[res].reviewed = true;
                          this.help.responses[res].imageReviewCreator = image === undefined ? null : image.data.public_id;
                          this.help.responses[res].messageCreator = this.message;
                          this.help.responses[res].ratingCreator = this.selectedValue ? this.selectedValue : 1;
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
            response.ratingResponder = this.selectedValue ? this.selectedValue : 1;

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

    createPost(response: HelpResponse): void {
        this.router.navigate(['/bacheca/form', this.help.id, response.idResponder, response.id], { queryParams: { likehelps: this.help.likehelps, lhToDonate: this.help.lhToDonate } });
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
        this.selectedValue = stars ? stars : 1;
    }

    canRespond() {
        return !this.help.accepted &&
            !this.help.reviewed &&
            !this.isExpired(this.help) &&
            !this.hasUserResponded &&
            !this.isHelpCreator;
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

    canCreatePost(r: HelpResponse): boolean {
        const creationEnabled =
            this.isHelpCreator && r.completed;
        return creationEnabled;
    }

    canSeeResponse(r: HelpResponse) {
        const responseDisplayed =
            r.accepted ||
            !this.help.accepted ||
            this.help.type.code == 'COH';
        return responseDisplayed;
    }

    canSeeResponseMessage(r: HelpResponse): boolean {
        const responseDisplayed =
            r.accepted ||
            this.isHelpCreator ||
            !this.help.accepted && this.help.type.code != 'COH' ||
            r.idResponder === this.as.currentUserValue.id && !this.help.reviewed && this.help.type.code == 'COH';
        return responseDisplayed;
    }

    isExpired(help: Help): boolean {
        const now = moment.utc();
        const then = moment.utc(help.dateEndValidity);
        const timespan = then.diff(now);
        return timespan < 0;
    }


}
