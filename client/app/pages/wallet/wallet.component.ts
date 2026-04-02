import { Component, OnInit } from '@angular/core';
import { Help, HelpResponse, Transaction, User } from '@app/models';
import { AuthenticationService } from '@app/services';
import { TransactionService } from '@app/services/transaction.service';
import { ThisMonthInstance } from 'twilio/lib/rest/api/v2010/account/usage/record/thisMonth';

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
  num1: number = 0;
  num2: number = 0;
  num3: number = 0;
  num4: number = 0;
  num5: number = 0;
  

  constructor(
    private ts: TransactionService,
    private as: AuthenticationService,
    ) { 
      this.getNumbers();
      this.getCurrentUser(); 
    }

  ngOnInit(): void {
    this.ts.getPositiveTransaction(this.currentUser.id).subscribe((res) => {
      console.log(res)
      this.positiveTransactions = res.map(el => {
        const t: Transaction = {
          idHelp: el.help.id,
          idCreator: el.help.idCreator,
          idResponder: el.responder.id,
          description: el.help.description,
          date: new Date(el.help.updatedAt),
          likeHelp: el.help.likehelps,
          lhToDonate: el.help.lhToDonate,
          idDonateTo: el.help.idDonateTo,
          isPositive: true,
          help: el.help,
          creator: el.help.creator,
          responder: el.responder,
          association: el.help.association
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
            likeHelp: el.likehelps,
            lhToDonate:el.lhToDonate,
            idDonateTo: el.idDonateTo,
            isPositive: false,
            help: el,
            creator: el.creator,
            responder: null,
            association: el.association
          };
          return t;
        });
        
        this.getAllTransactions();

      })
      
    });
    
  }

  getNumbers(): void {
    this.num1 = Math.floor(
      Math.random() * (10000 - 1000) + 1000
    );
    this.num2 = Math.floor(
      Math.random() * (10000 - 1000) + 1000
    );
    this.num3 = Math.floor(
      Math.random() * (10000 - 1000) + 1000
    );
    this.num4 = Math.floor(
      Math.random() * (10000 - 1000) + 1000
    );
    this.num5 = Math.floor(
      Math.random() * (1000 - 100) + 100
    );

  }

  getCurrentUser(): void {
    this.as.getCurrentUser().subscribe(x => {
        this.currentUser = x;
    });
   
  }

  getAllTransactions() {
    this.transactions = this.negativeTransactions.concat(this.positiveTransactions);
    this.transactions.sort((a, b) => {return a.date.getTime() - b.date.getTime();});
  }

  getDate( date: Date) {
    return date.toDateString();
  }

}
