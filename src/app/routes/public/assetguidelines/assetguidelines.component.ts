import { Component, OnInit } from '@angular/core'
import { ConfigurationsService, NsPage } from '@ws-widget/utils'
import { SafeUrl, DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'ws-assetguidelines',
  templateUrl: './assetguidelines.component.html',
  styleUrls: ['./assetguidelines.component.scss'],
})
export class AssetguidelinesComponent implements OnInit {
  assetguidelines: SafeUrl | null = null


  pageNavbar: Partial<NsPage.INavBackground> = this.configSvc.pageNavBar

  constructor(private configSvc: ConfigurationsService, private domSanitizer: DomSanitizer) {
    const instanceConfig = this.configSvc.instanceConfig
    if (instanceConfig) {
      this.assetguidelines = this.domSanitizer.bypassSecurityTrustResourceUrl(
        instanceConfig.banners.assetguidelines,
      )
    }
  }

  ngOnInit() {
  }

}
