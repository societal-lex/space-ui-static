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
  // appbanner1: SafeUrl | null = null
  loadText = false

  constructor(private configSvc: ConfigurationsService, private domSanitizer: DomSanitizer) {
    const instanceConfig = this.configSvc.instanceConfig
    // const instanceConfig1 = this.configSvc.instanceConfig
    if (instanceConfig) {
      this.appBanner = this.domSanitizer.bypassSecurityTrustResourceUrl(
        instanceConfig.banners.mainBanner,
      )
      this.loadText = true
    }

    // else if (instanceConfig1) {
    //   this.appbanner1 = this.domSanitizer.bypassSecurityTrustResourceUrl(
    //     instanceConfig1.banners.mainBannermobile,
    //   )
    //   // this.loadText = true
    // }

  }
  ngOnInit() {
  }

}
