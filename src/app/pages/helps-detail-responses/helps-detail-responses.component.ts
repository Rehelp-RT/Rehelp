import { Component, OnInit, Input } from '@angular/core';
import { Help, HelpResponse, User } from '@app/models';
import { ResponseService } from '@app/services';
import { Router } from '@angular/router';
import { ModalService } from '@app/shared/components';

@Component({
  selector: 'app-helps-detail-responses',
  templateUrl: './helps-detail-responses.component.html',
  styleUrls: ['./helps-detail-responses.component.css']
})
export class HelpsDetailResponsesComponent implements OnInit {

  @Input() help: Help;
  @Input() currentUser: User;

  // responses
  isHelpCreator: boolean;
  isResponderAccepted: boolean;
  isUserResponded: boolean;
  isUserAccepted: boolean;

  // feedback
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  message = '';

  constructor(
    private rs: ResponseService,
    private router: Router,
    private modalService: ModalService) { }

  ngOnInit() {
    this.checkHelpCreator();
    this.isUserResponded = this.checkUserResponse(this.help.responses, this.currentUser.id);
    this.isUserAccepted = this.checkUserAccept(this.help.responses);
    this.isResponderAccepted = this.checkResponderAccepted(this.help.responses, this.currentUser.id);
  }

  checkHelpCreator(): void {
    this.isHelpCreator = this.currentUser.id === this.help.creator.id;
  }

  checkUserResponse(reponses, userId) {
    return reponses.some((response) => {
      return response.responder.id === userId;
    });
  }

  checkUserAccept(reponses) {
    return reponses.some((response) => {
      return response.accepted === true;
    });
  }

  checkResponderAccepted(reponses, userId) {
    return reponses.some((response) => {
      return response.accepted === true && response.responder.id === userId;
    });
  }

  accept(response: HelpResponse): void {
    this.rs.acceptResponse(response)
      .subscribe(() => {
        response.accepted = true;
        this.isUserAccepted = this.checkUserAccept(this.help.responses);
        console.log('response.accepted', response.accepted);
        console.log('isUserAccepted', this.isUserAccepted);
        // this.getHelp(x.idHelp);
      });
  }

  cancel(response: HelpResponse): void {
    this.rs.cancelResponse(response)
      .subscribe(() => {
        response.accepted = false;
        this.isUserAccepted = this.checkUserAccept(this.help.responses);
        console.log('response.accepted', response.accepted);
        console.log('isUserAccepted', this.isUserAccepted);
      });
  }

  review(response: HelpResponse, message: string): void {

    if (this.isHelpCreator) {
      response.messageCreator = message;
      response.ratingCreator = this.selectedValue;
      this.rs.creatorFeedback(response).subscribe(() => {
        response.reviewed = true;
        this.modalService.close('modal-complete-' + response.id);
        this.router.navigate(['/helps/', this.help.id]);
      });
    }

    console.log('response', response);
  }

  complete(response: HelpResponse, message: string): void {

    console.log('response', response);

    if (this.isResponderAccepted) {
      response.messageResponder = message;
      response.ratingResponder = this.selectedValue;
      this.rs.completeResponse(response).subscribe(() => {
          response.completed = true;
          this.modalService.close('modal-complete-' + response.id);
          this.router.navigate(['/helps/', this.help.id]);
        });
    }

    console.log('response', response);
  }

  deleteResponse(response: HelpResponse): void {
    this.rs.deleteResponse(response)
      .subscribe(x =>
        this.router.navigate(['/helps/, model.id'])
      );
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  countStar(star) {
    this.selectedValue = star;
  }

}
