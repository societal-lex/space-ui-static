import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material'
import { CertificatesRoutingModule } from './certificates-routing.module'
import { CompletioncertficateComponent } from './components/completioncertficate/completioncertficate.component'
import { CertificateServiceService } from './services/certificate-service/certificate-service.service'
import { MatToolbarModule } from '@angular/material/toolbar'
import { BtnPageBackModule } from '../../../../../library/ws-widget/collection/src/lib/btn-page-back/btn-page-back.module'
@NgModule({
  declarations: [CompletioncertficateComponent],
  imports: [
    CommonModule,
    CertificatesRoutingModule,
    MatIconModule,
    MatToolbarModule,
    BtnPageBackModule,
  ],
  providers: [CertificateServiceService],
  exports: [CompletioncertficateComponent],
})
export class CertificatesModule { }
