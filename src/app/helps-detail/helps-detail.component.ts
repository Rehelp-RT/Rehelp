import { Component, OnInit } from '@angular/core';
import { HelpService, UserService, AuthenticationService } from '../_services';
import { Help, User } from '../_models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-helps-detail',
  templateUrl: './helps-detail.component.html',
  styleUrls: ['./helps-detail.component.css']
})
export class HelpsDetailComponent implements OnInit {

  help: Help = null;
  creator: User = null;
  currentUser: User = null;
  autore: boolean = null;

  constructor(private hs: HelpService, private actRoute: ActivatedRoute, private us: UserService, private as: AuthenticationService) { }

  ngOnInit() {
    const id = this.actRoute.snapshot.params['id'];
    this.getHelp(id);
    this.getCurrentUser();
  }

  getHelp(id: number): void {
    this.hs.getById(id)
      .subscribe(x => {
        this.help = x;
      });
  }

  getCreator(id: number): void {
    this.us.getById(id)
      .subscribe(x => {
        this.creator = x;
      });
  }

  getCurrentUser(): void {
    this.as.getCurrentUser()
      .subscribe(x => {
        this.currentUser = x;
      })
    this.getAutore();
  }

  getAutore(): void{
    if (this.currentUser == this.creator){
      this.autore = true;
    }
    else{
      this.autore = false;
    }
    console.log(this.currentUser)
  }
}
