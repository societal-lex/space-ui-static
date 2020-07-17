import { Component, OnInit } from '@angular/core'
import { SafeUrl, DomSanitizer } from '@angular/platform-browser'
import { ConfigurationsService, NsPage } from '@ws-widget/utils'

@Component({
  selector: 'ws-contentpolicyandcommunication',
  templateUrl: './contentpolicyandcommunication.component.html',
  styleUrls: ['./contentpolicyandcommunication.component.scss'],
})
export class ContentpolicyandcommunicationComponent implements OnInit {
  contentpolicy: SafeUrl | null = null
  pageNavbar: Partial<NsPage.INavBackground> = this.configSvc.pageNavBar

  constructor(private configSvc: ConfigurationsService, private domSanitizer: DomSanitizer) {
    const instanceConfig = this.configSvc.instanceConfig
    if (instanceConfig) {
      this.contentpolicy = this.domSanitizer.bypassSecurityTrustResourceUrl(
        instanceConfig.banners.contentpolicy,
      )
    }

  }

  ngOnInit() {
  }

}
