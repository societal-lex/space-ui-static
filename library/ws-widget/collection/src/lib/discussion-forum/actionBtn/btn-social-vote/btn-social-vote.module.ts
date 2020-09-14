import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BtnSocialVoteComponent } from './btn-social-vote.component'
import { MatIconModule, MatButtonModule, MatBadgeModule, MatCardModule } from '@angular/material'
import { MatTooltipModule } from '@angular/material/tooltip'
import { DialogSocialActivityUserModule } from '../../dialog/dialog-social-activity-user/dialog-social-activity-user.module'
import { DisplayUsersSocialVoteModule } from '../display-users-social-vote/display-users-social-vote.module'

@NgModule({
  declarations: [BtnSocialVoteComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatBadgeModule, MatCardModule,
    DialogSocialActivityUserModule, MatTooltipModule, DisplayUsersSocialVoteModule,
  ],
  exports: [BtnSocialVoteComponent],
})
export class BtnSocialVoteModule { }
