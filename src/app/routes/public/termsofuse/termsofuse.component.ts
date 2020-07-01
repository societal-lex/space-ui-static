import { Component, OnInit } from '@angular/core'
import { ConfigurationsService, NsPage } from '@ws-widget/utils'
import { SafeUrl, DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'ws-termsofuse',
  templateUrl: './termsofuse.component.html',
  styleUrls: ['./termsofuse.component.scss'],
})
export class TermsofuseComponent implements OnInit {

  termsOfUse: SafeUrl | null = null

  pageNavbar: Partial<NsPage.INavBackground> = this.configSvc.pageNavBar

  constructor(private configSvc: ConfigurationsService, private domSanitizer: DomSanitizer) {
    const instanceConfig = this.configSvc.instanceConfig
    if (instanceConfig) {
      this.termsOfUse = this.domSanitizer.bypassSecurityTrustResourceUrl(
        instanceConfig.banners.termsOfUse,
      )
    }
  }

  ngOnInit() {
  }

}
