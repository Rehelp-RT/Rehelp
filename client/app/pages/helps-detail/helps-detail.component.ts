import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthenticationService, HelpService } from '@app/services';
import { Help, User } from '@app/models';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from '@app/shared/components';

@Component({
  selector: 'app-helps-detail',
  templateUrl: './helps-detail.component.html',
  styleUrls: ['./helps-detail.component.scss']
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
        private modalService: ModalService,
        private as: AuthenticationService) { }

    ngOnInit() {
        const id = this.actRoute.snapshot.params.id;
        this.getHelp(id);
        this.currentUser = this.as.currentUserValue;
    }

    getHelp(id: number): void {
        this.hs.getById(id)
            .subscribe(help => {
                this.help = help;
        });
    }

    getImage(help: Help) {
        if (help.image != null) {
            return 'https://res.cloudinary.com/hwbyvepex/image/upload/v1582196512/' + help.image;
        } else if (help.category.image != null) {
            return 'assets/img/categories/' + help.category.image;
        } else {
            return 'assets/img/placeholder-help.png';
        }
    }

    deleteHelp() {
        if (this.help.idCreator == this.as.currentUserValue.id) {
            // can delete
            this.hs.deleteHelp(this.help).subscribe(x =>
                this.router.navigate(['/helps'])
            );
        }
    }

    openModal(id: string) {
      this.modalService.open(id);
    }

    closeModal(id: string) {
      this.modalService.close(id);
    }

    back() {
      this.location.back();
    }

}
