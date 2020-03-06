import { Component, OnInit, Input } from '@angular/core';
import { Help, HelpResponse, User } from '@app/_models';
import { ResponseService } from '@app/_services';
import { Router } from '@angular/router';
import { ModalService } from '@app/_modal';

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

  accept(response: HelpResponse): void {
    this.rs.acceptResponse(response)
      .subscribe(x => {
        response.accepted = true;
        this.isUserAccepted = this.checkUserAccept(this.help.responses);
        // this.getHelp(x.idHelp);
      });
  }

  cancel(response: HelpResponse): void {
    this.rs.cancelResponse(response)
      .subscribe(x => {
        response.accepted = false;
        this.isUserAccepted = this.checkUserAccept(this.help.responses);
        // this.getHelp(x.idHelp);
      });
  }

  review(response: HelpResponse, message: string): void {
    response.messageCreator = message;
    response.ratingCreator = this.selectedValue;
    console.log('response', response);

    this.rs.creatorFeedback(response).subscribe(() => {
        response.reviewed = true;
        this.modalService.close('modal-complete-' + response.id);
        this.router.navigate(['/helps/', this.help.id]);
    });
    /*
    this.rs.completeResponse(response)
    .subscribe(x => {
      this.getHelp(x.idHelp);
    });
    */
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
