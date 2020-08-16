import { Component } from '@angular/core'
import { ConfigurationsService, NsPage } from '@ws-widget/utils'
@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css'],
})
export class QrcodeComponent {
  pageNavbar: Partial<NsPage.INavBackground> = this.configSvc.pageNavBar
  constructor(private configSvc: ConfigurationsService) {}

  back() {
    window.history.back()
  }
}
