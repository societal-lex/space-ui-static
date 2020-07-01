import { Component, OnInit } from '@angular/core'
import { ConfigurationsService, NsPage } from '@ws-widget/utils'
import { SafeUrl, DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'ws-licencepolicy',
  templateUrl: './licencepolicy.component.html',
  styleUrls: ['./licencepolicy.component.scss'],
})
export class LicencepolicyComponent implements OnInit {
  licensePolicy: SafeUrl | null = null
  pageNavbar: Partial<NsPage.INavBackground> = this.configSvc.pageNavBar

  constructor(private configSvc: ConfigurationsService, private domSanitizer: DomSanitizer) {
    const instanceConfig = this.configSvc.instanceConfig
    if (instanceConfig) {
      this.licensePolicy = this.domSanitizer.bypassSecurityTrustResourceUrl(
        instanceConfig.banners.licensePolicy,
      )
    }
  }

  ngOnInit() {
  }

}
