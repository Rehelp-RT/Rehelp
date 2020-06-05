import { Component, OnInit } from '@angular/core';
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

    constructor(private route: ActivatedRoute, private rs: ResponseService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const idResponder = params.id;

            this.rs.getAll(idResponder, true).subscribe(x => {
                this.isLoading = false;
                this.responses = x;
            });
        });
    }

}
