import { Component, OnInit } from '@angular/core';
import { AuthenticationService, HelpService, ResponseService } from '@app/_services';
import { Help, HelpResponse, User } from '@app/_models';
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
  userResponse: boolean;

  constructor(
    private hs: HelpService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private as: AuthenticationService,
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
        // this.accepted = x.responses.some((y) => {
        //   return y.accepted;
        // });
        // this.completed = x.responses.some((y) => {
        //   return y.completed;
        // });
        this.userResponse = this.checkUserResponse(x.responses, this.currentUser.id);
        this.checkAuthor();
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

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
