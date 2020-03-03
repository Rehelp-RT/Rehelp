import { Component, OnInit } from '@angular/core';
import { AuthenticationService, FeedbackService, HelpService, ResponseService } from '@app/_services';
import { Help, HelpResponse, User, Feedback } from '@app/_models';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from '@app/_modal';

@Component({
  selector: 'app-helps-detail',
  templateUrl: './helps-detail.component.html',
  styleUrls: ['./helps-detail.component.css']
})
export class HelpsDetailComponent implements OnInit {

  author: boolean;
  model: Help = null;
  currentUser: User = null;
  accepted = false;
  completed = false;
  userResponse: boolean;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  feedback: Feedback = null;
  acceptedResponse: HelpResponse;

  constructor(
    private hs: HelpService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private as: AuthenticationService,
    private fs: FeedbackService,
    private rs: ResponseService,
    private modalService: ModalService
    ) {
    const id = this.actRoute.snapshot.params.id;
    this.getHelp(id);
    this.getCurrentUser();
  }

  ngOnInit() {
  }

  getHelp(id: number): void {
    this.hs.getById(id)
      .subscribe(x => {
        this.model = x;
        this.accepted = x.responses.some((y) => {
          return y.accepted;
        });
        this.completed = x.responses.some((y) => {
          return y.completed;
        });
        this.userResponse = this.checkUserResponse(x.responses, this.currentUser.id);
        this.checkAuthor();
        this.acceptedResponse = x.responses.find(x => x.accepted === true);
      });
  }

  getCurrentUser(): void {
    this.as.getCurrentUser()
      .subscribe(x => {
        this.currentUser = x;
      });
  }

  checkAuthor(): void {
    if (this.currentUser.username === this.model.creator.username) {
      this.author = true;
    } else {
      this.author = false;
    }
  }

  accept(response: HelpResponse): void {
    this.accepted = true;
    this.rs.acceptResponse(response)
      .subscribe(x => {
        this.getHelp(x.idHelp);
      });
  }

  cancel(response: HelpResponse): void {
    this.accepted = false;
    this.rs.cancelResponse(response)
      .subscribe(x => {
        this.getHelp(x.idHelp);
      });
  }

  complete(response: HelpResponse, message: string): void {
    this.completed = true;
    this.feedback = new Feedback();
    this.feedback.message = message;
    this.feedback.rating = this.selectedValue;
    this.feedback.idHelp = this.model.id;
    this.feedback.idReviewer = this.currentUser.id;
    this.feedback.idReviewed = this.acceptedResponse.responder.id;
    const idModel = this.model.id;
    this.fs.addFeedback(this.feedback)
    .subscribe(x => {
      this.modalService.close('modal-complete');
      this.router.navigate(['/helps/', idModel])
    })
    /*
    this.rs.completeResponse(response)
    .subscribe(x => {
      this.getHelp(x.idHelp);
    });
    */
  }

  deleteHelp() {
    this.hs.deleteHelp(this.model)
      .subscribe(x =>
        this.router.navigate(['/helps'])
      );
  }

  checkUserResponse(arr, val) {
    return arr.some((arrVal) => {
      return val === arrVal.responder.id;
    });
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
