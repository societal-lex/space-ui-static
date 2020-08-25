import { Component, OnInit, OnDestroy } from '@angular/core'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
import { ConfigurationsService, NsPage, AuthKeycloakService } from '@ws-widget/utils'
import { IWSPublicLoginConfig } from '../login/login.model'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'

@Component({
  selector: 'ws-app-public-nav-bar',
  templateUrl: './app-public-nav-bar.component.html',
  styleUrls: ['./app-public-nav-bar.component.scss'],
})
export class AppPublicNavBarComponent implements OnInit, OnDestroy {
  appIcon: SafeUrl | null = null
  logo = ''
  appName = ''
  navBar: Partial<NsPage.INavBackground> | null = null
  loginConfig: IWSPublicLoginConfig | null = null
  private subscriptionLogin: Subscription | null = null
  // todo what to do for client login
  isClientLogin = false
  private redirectUrl = ''
  objectKeys = Object.keys

  constructor(
    private domSanitizer: DomSanitizer,
    private configSvc: ConfigurationsService,
    private activateRoute: ActivatedRoute,
    private authSvc: AuthKeycloakService,
  ) { }

  public get showPublicNavbar(): boolean {
    return true
  }

  ngOnInit() {
    if (this.configSvc.instanceConfig) {
      this.appIcon = this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.configSvc.instanceConfig.logos.app,
      )
      this.appName = this.configSvc.instanceConfig.details.appName
      this.navBar = this.configSvc.primaryNavBar
    }
    const paramsMap = this.activateRoute.snapshot.queryParamMap
    if (paramsMap.has('ref')) {
      this.redirectUrl = document.baseURI + paramsMap.get('ref')
    } else {
      this.redirectUrl = document.baseURI
    }

  }
  ngOnDestroy() {
    if (this.subscriptionLogin) {
      this.subscriptionLogin.unsubscribe()
    }
  }

  login(key: 'E' | 'N' | 'S') {
    this.authSvc.login(key, this.redirectUrl)
  }

}
