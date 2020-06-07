import { Component, OnInit, Input } from '@angular/core';
import { HelpResponse } from '@app/models';
import { ActivatedRoute } from '@angular/router';
import { ResponseService } from '@app/services';

@Component({
    selector: 'app-offered-help',
    templateUrl: './offered-help.component.html',
    styleUrls: ['./offered-help.component.scss']
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

}
