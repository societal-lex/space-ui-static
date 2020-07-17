import { Component, Input, OnInit, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { NsWidgetResolver, WidgetBaseComponent } from '@ws-widget/resolver'
import { BtnPageBackMobileService } from './btn-page-back-mobile.service'
type TUrl = undefined | 'none' | 'back' | string
@Component({
  selector: 'ws-widget-btn-page-back-mobile',
  templateUrl: './btn-page-back-mobile.component.html',
  styleUrls: ['./btn-page-back-mobile.component.scss'],
})
@Injectable()
export class BtnPageBackMobileComponent extends WidgetBaseComponent
  implements OnInit, NsWidgetResolver.IWidgetData<{ url: TUrl }> {
  @Input() widgetData: { url: TUrl } = { url: 'none' }
  presentUrl = ''
  constructor(
    private btnBackSvc: BtnPageBackMobileService,
    private router: Router,
  ) {
    super()
  }

  ngOnInit() {
    this.presentUrl = this.router.url

  }

  get backUrl(): { fragment?: string; routeUrl: string; queryParams: any } {

    // if (this.presentUrl === '/page/explore') {
    //   return {
    //     queryParams: undefined,
    //     routeUrl: '/page/home',
    //   }
    // }

    if (this.widgetData.url === 'doubleBack') {
      return {
        fragment: this.btnBackSvc.getLastUrl(2).fragment,
        queryParams: this.btnBackSvc.getLastUrl(2).queryParams,
        routeUrl: this.btnBackSvc.getLastUrl(2).route,
      }
    } if (this.widgetData.url === 'back') {
      return {
        fragment: this.btnBackSvc.getLastUrl().fragment,
        queryParams: this.btnBackSvc.getLastUrl().queryParams,
        routeUrl: this.btnBackSvc.getLastUrl().route,
      }
    }
    if (this.widgetData.url !== 'back' && this.widgetData.url !== 'doubleBack') {

      this.btnBackSvc.checkUrl(this.widgetData.url)

    }

    return {
      queryParams: undefined,
      routeUrl: this.widgetData.url ? this.widgetData.url : '/app/home',
    }
  }

}
