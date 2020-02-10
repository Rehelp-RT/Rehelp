import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models';
import { UserService } from '@app/_services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  model: User = null;
  submitted = false;

  constructor(
    private us: UserService,
    private router: Router,
    private activeRouter: ActivatedRoute
    ) { 
      const id = this.activeRouter.snapshot.params.id;
      this.us.getById(id).subscribe(x => {
        this.model = x;
      });
    }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.us.update(this.model).subscribe(
      res => {
        this.router.navigate(['/profile']);
      },
      err => {
        console.log(err);
      }
    );
  }

}
