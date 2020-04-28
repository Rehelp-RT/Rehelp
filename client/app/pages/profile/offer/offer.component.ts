import { Component, OnInit } from '@angular/core';
import { HelpCategory } from '@app/models';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService, UserService } from '@app/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesEditComponent } from './categories-edit/categories-edit.component';

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
        private userService: UserService,
        private modalService: NgbModal) { }

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

    open(userCategories: HelpCategory[]) {
        const modalRef = this.modalService.open(CategoriesEditComponent, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.userChoices = userCategories.map(x => x.id);
    }

}
