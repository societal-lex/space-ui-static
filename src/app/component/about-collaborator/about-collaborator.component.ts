import { Component, OnInit, OnDestroy, AfterViewInit, Compiler } from '@angular/core'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { DomSanitizer, SafeResourceUrl, SafeStyle } from '@angular/platform-browser'
import { map } from 'rxjs/operators'
import { ConfigurationsService, NsPage } from '@ws-widget/utils'
import { Subscription } from 'rxjs'
import { ActivatedRoute } from '@angular/router'
import { IAboutObject } from '../../routes/public/public-about/about.model'

@Component({
  selector: 'ws-about-collaborator',
  templateUrl: './about-collaborator.component.html',
  styleUrls: ['./about-collaborator.component.scss'],
})
export class AboutCollaboratorComponent implements OnInit, OnDestroy, AfterViewInit {
  objectKeys = Object.keys
  headerBanner: SafeStyle | null = null
  footerBanner: SafeStyle | null = null
  pageNavbar: Partial<NsPage.INavBackground> = this.configSvc.pageNavBar
  aboutPage: IAboutObject | null = null
  private subscriptionAbout: Subscription | null = null

  isSmallScreen$ = this.breakpointObserver
    .observe(Breakpoints.XSmall)
    .pipe(map(breakPointState => breakPointState.matches))

  videoLink: SafeResourceUrl | null = null
  aboutImage: SafeStyle | null = null
  forPreview = false

  constructor(
    private breakpointObserver: BreakpointObserver,
    private domSanitizer: DomSanitizer,
    private configSvc: ConfigurationsService,
    private activateRoute: ActivatedRoute,
    private _compiler: Compiler,
  ) { }

  ngOnInit() {
    this.scroll()
    this._compiler.clearCache()
    this.subscriptionAbout = this.activateRoute.data.subscribe(data => {
      this.aboutPage = data.pageData.data
      if (this.aboutPage && this.aboutPage.banner && this.aboutPage.banner.videoLink) {
        this.videoLink = this.domSanitizer.bypassSecurityTrustResourceUrl(
          this.aboutPage.banner.videoLink,
        )
      }
    })

    if (this.configSvc.instanceConfig) {
      (this.headerBanner = this.domSanitizer.bypassSecurityTrustStyle(
        `url('${this.configSvc.instanceConfig.logos.aboutHeader}')`,
      )),
        (this.footerBanner = this.domSanitizer.bypassSecurityTrustStyle(
          `url('${this.configSvc.instanceConfig.logos.aboutFooter}')`,
        ))
      this.aboutImage = this.configSvc.instanceConfig.banners.aboutBanner
    }
  }
  ngAfterViewInit(): void {

  }
  scroll() {
    const about = document.getElementById('about') as HTMLElement
    const collaborator = document.getElementById('collaborator') as HTMLElement
    if (window.location.href.includes('about') && about) {
      setTimeout(() => {
        about.scrollIntoView({
            behavior: 'smooth', block: 'start'
            })
      }, 500)
      // location.hash = 'views'
      // location.pathname + '#about'
    }
    if (window.location.href.includes('collaborators') && collaborator) {
      setTimeout(()=>{
        collaborator.scrollIntoView({
             behavior: 'smooth',
              block: 'start'
               })
      }, 500)
      // location.hash = 'view'
      // location.pathname + '#collaborator'
    }
  }
  // ngAfterViewChecked() {

  //   if (!this.scrollExecuted) {
  //     let routeFragmentSubscription: Subscription
  //     console.log(this.activateRoute.fragment)
  //     // Automatic scroll
  //     routeFragmentSubscription =
  //       this.activatedRoute.fragment
  //         .subscribe(fragment => {
  //           console.log(fragment)
  //           if (fragment) {
  //             let element = document.getElementById(fragment)
  //             if (element) {
  //               element.scrollIntoView()
  //               this.scrollExecuted = true
  //               // Free resources
  //               setTimeout(
  //                 () => {
  //                   console.log('routeFragmentSubscription unsubscribe')
  //                   routeFragmentSubscription.unsubscribe()
  //                 }, 1000)

  //             }
  //           }
  //         })
  //   }

  // }

  ngOnDestroy() {
    if (this.subscriptionAbout) {
      this.subscriptionAbout.unsubscribe()
    }
  }
}
