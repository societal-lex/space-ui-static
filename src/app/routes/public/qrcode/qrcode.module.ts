import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { QrcodeComponent } from './qrcode/qrcode.component'
import { QrCodeRoutingModule } from './qrcode/qrcode-routing.module'
import { BtnPageBackModule } from '../../../../../library/ws-widget/collection/src/lib/btn-page-back/btn-page-back.module'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatCardModule } from '@angular/material/card'
@NgModule({
  declarations: [QrcodeComponent],
  imports: [
    CommonModule,
    QrCodeRoutingModule,
    BtnPageBackModule,
    MatToolbarModule,
    MatCardModule,
  ],
})
export class QrcodeModule { }
