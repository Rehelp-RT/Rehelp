import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Help, HelpResponse, Transaction, User } from '@app/models';
import { AuthenticationService } from '@app/services';
import { TransactionService } from '@app/services/transaction.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  transactions: Transaction[] = [];
  positiveTransactions: Transaction[] = [];
  negativeTransactions: Transaction[] = [];
  currentUser: User = null;

  constructor(
    private ts: TransactionService,
    private as: AuthenticationService,
    ) { this.getCurrentUser(); }

  ngOnInit(): void {
    this.ts.getPositiveTransaction(this.currentUser.id).subscribe((res) => {
      this.positiveTransactions = res.map(el => {
        const t: Transaction = {
          idHelp: el.help.id,
          idCreator: el.help.idCreator,
          idResponder: el.responder.id,
          description: el.help.description,
          date: el.help.updatedAt,
          likeHelp: 1,
          isPositive: true,
          help: el.help,
          creator: el.help.creator,
          responder: el.responder,
        };
        return t;
      });
      this.ts.getNegativeTransaction(this.currentUser.id).subscribe((res) => {
        this.negativeTransactions = res.map(el => {
          const t: Transaction = {
            idHelp: el.id,
            idCreator: el.creator.id,
            idResponder: null,
            description: el.description,
            date: new Date(el.updatedAt),
            likeHelp: 1,
            isPositive: false,
            help: el,
            creator: el.creator,
            responder: null,
          };
          return t;
        });
        

        this.getAllTransactions();
      })
      
    });
    
    
  }

  getCurrentUser(): void {
    this.as.getCurrentUser().subscribe(x => {
        this.currentUser = x;
    });
  }

  getAllTransactions() {
    this.transactions.push.apply(this.positiveTransactions, this.negativeTransactions);
    
    // this.transactions.sort((a, b) => a.date.getTime() - b.date.getTime());
    console.log(this.transactions)
  }

}
