import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule, MatIconModule, MatTooltipModule } from '@angular/material'
import { BtnFlagComponent } from './btn-flag.component'
import { DialogBoxModeratorModule } from '../../Dialog-Box/dialog-box-moderator/dialog-box-moderator.module'
import { DialogBoxModeratorComponent } from '../../Dialog-Box/dialog-box-moderator/dialog-box-moderator.component'

@NgModule({
  declarations: [BtnFlagComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    DialogBoxModeratorModule,
  ],
  exports: [BtnFlagComponent],
  entryComponents: [DialogBoxModeratorComponent],

})
export class BtnFlagModule { }
