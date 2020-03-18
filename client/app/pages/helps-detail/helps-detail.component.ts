import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthenticationService, HelpService } from '@app/services';
import { Help, User } from '@app/models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-helps-detail',
  templateUrl: './helps-detail.component.html',
  styleUrls: ['./helps-detail.component.css']
})
export class HelpsDetailComponent implements OnInit {

  help: Help = null;
  currentUser: User = null;
  isHelpCompleted: boolean;

  constructor(
    private location: Location,
    private hs: HelpService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private as: AuthenticationService) { }

  ngOnInit() {
      const id = this.actRoute.snapshot.params.id;
      this.getHelp(id);
      this.currentUser = this.as.currentUserValue;
  }

  getHelp(id: number): void {
      this.hs.getById(id)
          .subscribe(x => {
              this.help = x;
      });
  }

  deleteHelp() {
    this.hs.deleteHelp(this.help)
      .subscribe(x =>
        this.router.navigate(['/helps'])
      );
  }

  back() {
    this.location.back();
  }

}
