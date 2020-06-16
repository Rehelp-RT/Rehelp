import { Component, OnInit } from '@angular/core';
import {
    AuthenticationService,
    HelpService,
    ResponseService,
    TradeService
} from '@app/services';
import { HelpResponse, HelpType, User, TradeTypes } from '@app/models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-helps-response',
    templateUrl: './helps-response.component.html',
    styleUrls: ['./helps-response.component.scss']
})
export class HelpsResponseComponent implements OnInit {
    author: boolean;
    response: HelpResponse;
    creator: User = null;
    currentUser: User = null;
    type: HelpType = null;

    // MES trade types
    tradeTypes: TradeTypes[] = [];
    public idTradeType = null;

    constructor(
        private hs: HelpService,
        private actRoute: ActivatedRoute,
        private router: Router,
        private as: AuthenticationService,
        private rs: ResponseService,
        private ts: TradeService
    ) {
    }

    ngOnInit() {
        const id = this.actRoute.snapshot.params.id;
        this.getHelp(id);
        
        this.getCurrentUser();

        // trade types
        this.initTrades();
    }

    getHelp(id: number): void {
        this.hs.getById(id).subscribe(x => {
            this.response = new HelpResponse();
            this.response.help = x;
            this.response.responder = this.currentUser;
            this.response.idHelp = x.id;
            this.response.idResponder = this.currentUser.id;
        });
    }

    private initTrades() {
        // trades
        this.ts.getAll().subscribe(x => {
            this.tradeTypes = x;
            console.log('tradeTypes', this.tradeTypes)

            if (this.response && this.response.trade) {
                this.idTradeType = this.response.idTradeType;
            }
        });
    }

    getCurrentUser(): void {
        this.as.getCurrentUser().subscribe(x => {
            this.currentUser = x;
        });
    }

    onSubmit() {
      console.log(this.response);
      this.rs.addResponse(this.response).subscribe(
        res => {
          this.router.navigate(['/helps/', this.response.help.id]);
        },
        err => {
          console.log(err);
        }
      );
    }
}
