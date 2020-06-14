import { Component, OnInit, Input } from '@angular/core';
import { Help } from '@app/models';
import { ActivatedRoute } from '@angular/router';
import { HelpService } from '@app/services';

@Component({
    selector: 'app-requested-help',
    templateUrl: './requested-help.component.html',
    styleUrls: ['./requested-help.component.scss']
})
export class RequestedHelpComponent implements OnInit {

    helps: Help[] = [];
    isLoading = true;
    @Input() idUser: number;

    constructor(private route: ActivatedRoute, private hs: HelpService) { }

    ngOnInit() {
        this.hs.getAll(null, null, null, this.idUser).subscribe(x => {
            this.isLoading = false;
            this.helps = x;
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

}
