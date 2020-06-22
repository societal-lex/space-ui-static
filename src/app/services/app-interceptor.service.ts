import { Injectable, LOCALE_ID, Inject } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Observable } from 'rxjs'
import { ConfigurationsService } from '@ws-widget/utils'

@Injectable({
  providedIn: 'root',
})
export class AppInterceptorService implements HttpInterceptor {
  constructor(
    private configSvc: ConfigurationsService,
    @Inject(LOCALE_ID) private locale: string,
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const lang = [this.locale.replace('en-US', 'en')]
    if (this.configSvc.userPreference) {
      (this.configSvc.userPreference.selectedLangGroup || '')
        .split(',')
        .map(u => u.trim())
        .filter(u => u.length)
        .forEach(locale => {
          if (!lang.includes(locale)) {
            lang.push(locale)
          }
        })
    }

    if (this.configSvc.activeOrg && this.configSvc.rootOrg) {
      // tslint:disable-next-line: max-line-length
      const stipulatedWID = (req.headers.has('wid') && req.headers.get('wid')) ? req.headers.get('wid') : ((this.configSvc.userProfile && this.configSvc.userProfile.userId) || '')
      const modifiedReq = req.clone({
        setHeaders: {
          org: this.configSvc.activeOrg,
          rootOrg: this.configSvc.rootOrg,
          locale: lang.join(','),
          wid: stipulatedWID as string,
          hostPath: this.configSvc.hostPath,
        },
      })
      return next.handle(modifiedReq)
    }
    return next.handle(req)
  }
}
