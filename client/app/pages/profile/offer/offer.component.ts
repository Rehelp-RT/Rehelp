import { Component, OnInit } from '@angular/core';
import { HelpCategory } from '@app/models';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService, UserService } from '@app/services';

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
    private authService: AuthenticationService,
    private userService: UserService) { }

  ngOnInit() {
      this.route.parent.params.subscribe(params => {
          const idProfile = params.id;

          this.isOwner = this.authService.currentUserValue.id == idProfile;

          this.userService.getCategories(idProfile).subscribe(x => {
              if (x.categories && x.categories.length > 0) {
                  this.categories = x.categories;
              }
          });
      });
  }

}
