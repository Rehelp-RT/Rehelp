import { Component, OnInit, Input } from '@angular/core';
import { Help, HelpResponse, Feedback, User } from '@app/_models';
import { ResponseService, FeedbackService } from '@app/_services';
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
  accepted = false;
  completed = false;
  isUserResponded: boolean;

  // feedback
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  feedback: Feedback = null;

  constructor(
    private fs: FeedbackService,
    private rs: ResponseService,
    private router: Router,
    private modalService: ModalService) { }

  ngOnInit() {
    this.checkHelpCreator();
    this.isUserResponded = this.checkUserResponse(this.help.responses, this.currentUser.id);
  }

  checkHelpCreator(): void {
    this.isHelpCreator = this.currentUser.id === this.help.creator.id;
  }
  checkUserResponse(reponses, userId) {
    return reponses.some((response) => {
      return response.responder.id === userId;
    });
  }

  accept(response: HelpResponse): void {
    this.accepted = true;
    this.rs.acceptResponse(response)
      .subscribe(x => {
        response.accepted = true;
        // this.getHelp(x.idHelp);
      });
  }

  cancel(response: HelpResponse): void {
    this.accepted = false;
    this.rs.cancelResponse(response)
      .subscribe(x => {
        response.accepted = false;
        // this.getHelp(x.idHelp);
      });
  }

  complete(response: HelpResponse, message: string): void {
    this.completed = true;

    this.feedback = new Feedback();
    this.feedback.message = message;
    this.feedback.rating = this.selectedValue;
    this.feedback.idHelp = this.help.id;
    this.feedback.idReviewer = this.currentUser.id;
    this.feedback.idReviewed = response.responder.id;

    console.log('feedback', this.feedback);

    this.fs.addFeedback(this.feedback).subscribe(() => {
        this.modalService.close('modal-complete');
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
