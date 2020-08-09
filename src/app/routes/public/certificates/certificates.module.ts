import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CertificatesRoutingModule } from './certificates-routing.module'
import { CompletioncertficateComponent } from './components/completioncertficate/completioncertficate.component'
import { CertificateServiceService } from './services/certificate-service/certificate-service.service'


@NgModule({
  declarations: [CompletioncertficateComponent],
  imports: [
    CommonModule,
    CertificatesRoutingModule,
  ],
  providers: [CertificateServiceService],
  exports: [CompletioncertficateComponent]
})
export class CertificatesModule { }