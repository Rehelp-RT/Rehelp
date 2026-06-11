import { Component, OnInit, Input } from '@angular/core';
import { HelpResponse, Help } from '@app/models';
import { ActivatedRoute } from '@angular/router';
import { ResponseService } from '@app/services';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-offered-help',
    templateUrl: './offered-help.component.html',
    styleUrls: ['./offered-help.component.scss'],
    standalone: false
})
export class OfferedHelpComponent implements OnInit {

    responses: HelpResponse[] = [];
    isLoading = true;
    @Input() idUser: number;

    constructor(private route: ActivatedRoute, private rs: ResponseService) { }

    ngOnInit() {
        this.rs.getAll(this.idUser, true).subscribe(x => {
            this.isLoading = false;
            this.responses = x;
        });
    }
    
    getImage(help: Help) {
        if (help.image != null) {
            return `https://res.cloudinary.com/${environment.cloudinaryCloudName}/image/upload/v1582196512/` + help.image;
        } else if (help.category.image != null) {
            return 'assets/img/categories/' + help.category.image;
        } else {
            return 'assets/img/placeholder-help.png';
        }
    }

}
