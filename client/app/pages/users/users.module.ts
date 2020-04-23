import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared';
import { UsersRoutingModule } from './users-routing.module';

import { UsersComponent } from './users.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [ UsersComponent ],
  exports: [ UsersComponent ]
})
export class UsersModule { }
