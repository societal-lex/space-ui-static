import { Component, OnInit } from '@angular/core'
import { ConfigurationsService, NsPage } from '@ws-widget/utils'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'

@Component({
  selector: 'ws-grievanceredressal',
  templateUrl: './grievanceredressal.component.html',
  styleUrls: ['./grievanceredressal.component.scss'],
})
export class GrievanceredressalComponent implements OnInit {
  grievanceredressal: SafeUrl | null = null
  pageNavbar: Partial<NsPage.INavBackground> = this.configSvc.pageNavBar

  constructor(private configSvc: ConfigurationsService, private domSanitizer: DomSanitizer) {
    const instanceConfig = this.configSvc.instanceConfig
    if (instanceConfig) {
      this.grievanceredressal = this.domSanitizer.bypassSecurityTrustResourceUrl(
        instanceConfig.banners.grievanceredressal,
      )
    }
  }

  ngOnInit() {
  }

}
