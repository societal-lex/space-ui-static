import { Component, OnInit } from '@angular/core'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
import { ConfigurationsService } from '../../../../library/ws-widget/utils/src/public-api'

@Component({
  selector: 'ws-app-collaborators',
  templateUrl: './app-collaborators.component.html',
  styleUrls: ['./app-collaborators.component.scss'],
})
export class AppCollaboratorsComponent implements OnInit {

  collaboratorBanner: SafeUrl | null = null

  constructor(private configSvc: ConfigurationsService,
              private domSanitizer: DomSanitizer) {
    const instanceConfig = this.configSvc.instanceConfig
    if (instanceConfig) {
      this.collaboratorBanner = this.domSanitizer.bypassSecurityTrustResourceUrl(
        instanceConfig.banners.collaboratorBanner,
      )
    }
  }
  ngOnInit() {
  }
}
