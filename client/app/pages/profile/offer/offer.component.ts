import { Component, OnInit } from '@angular/core';
import { HelpCategory } from '@app/models';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/services';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  categories: HelpCategory[] = [];
  isOwner = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      const idProfile = params.id;

      this.isOwner = this.authService.currentUserValue.id == idProfile;
      console.log(idProfile);
      console.log(this.authService.currentUserValue.id);
    });
  }

}
