import { Component, OnInit } from '@angular/core'
import { SafeUrl, DomSanitizer } from '@angular/platform-browser'
import { ConfigurationsService } from '../../../../library/ws-widget/utils/src/public-api'

@Component({
  selector: 'ws-app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.scss'],
})
export class AppHomeComponent implements OnInit {
  appBanner: SafeUrl | null = null
  loadText = false
  constructor(private configSvc: ConfigurationsService,
    private domSanitizer: DomSanitizer) {
    const instanceConfig = this.configSvc.instanceConfig
    if (instanceConfig) {
      this.appBanner = this.domSanitizer.bypassSecurityTrustResourceUrl(
        instanceConfig.banners.mainBanner,
      )
      this.loadText = true
    }
  }
  ngOnInit() {
  }

}
