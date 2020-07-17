import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { MatButtonModule, MatIconModule } from '@angular/material'
import { BtnPageBackMobileComponent } from './btn-page-back-mobile.component'

@NgModule({
  declarations: [BtnPageBackMobileComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [BtnPageBackMobileComponent],
  entryComponents: [BtnPageBackMobileComponent],
})
export class BtnPageBackMobileModule { }
