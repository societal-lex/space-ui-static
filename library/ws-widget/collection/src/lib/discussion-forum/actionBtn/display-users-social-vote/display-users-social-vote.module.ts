import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DisplayUsersSocialVoteComponent } from './display-users-social-vote.component'
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [DisplayUsersSocialVoteComponent],
  imports: [
    CommonModule, MatCardModule],
  exports: [DisplayUsersSocialVoteComponent],
})
export class DisplayUsersSocialVoteModule { }
