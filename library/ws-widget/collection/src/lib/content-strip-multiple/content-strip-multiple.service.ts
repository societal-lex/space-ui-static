import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { getStringifiedQueryParams, ConfigurationsService } from '@ws-widget/utils'
import { NsContentStripMultiple } from './content-strip-multiple.model'

@Injectable({
  providedIn: 'root',
})
export class ContentStripMultipleService {

  constructor(
    private http: HttpClient,
    private configSvc: ConfigurationsService
  ) { }

  getContentStripResponseApi(request: NsContentStripMultiple.IStripRequestApi, filters?: { [key: string]: string | undefined }):
    Observable<NsContentStripMultiple.IContentStripResponseApi> {
    let stringifiedQueryParams = ''
    stringifiedQueryParams = getStringifiedQueryParams({
      pageNo: request.queryParams ? request.queryParams.pageNo : undefined,
      pageSize: request.queryParams ? request.queryParams.pageSize : undefined,
      pageState: request.queryParams ? request.queryParams.pageState : undefined,
      sourceFields: request.queryParams ? request.queryParams.sourceFields : undefined,
      filters: filters ? encodeURIComponent(JSON.stringify(filters)) : undefined,
      excludeContentType: request.queryParams ? request.queryParams.excludeContentType : undefined,
    })
    let url = request.path
    url += stringifiedQueryParams ? `?${stringifiedQueryParams}` : ''
    return this.http.get<NsContentStripMultiple.IContentStripResponseApi>(url)
  }
  isVisibileAccToRoles(allowedRoles: [string], notAllowedRoles: [string]) {
    let finalAcceptance = true
    if (this.configSvc.userRoles && this.configSvc.userRoles.size) {
      if (notAllowedRoles.length) {
        const rolesOK = notAllowedRoles.some(role => (this.configSvc.userRoles as Set<string>).has(role))
        if (rolesOK) {
          finalAcceptance = false
        } else {
          finalAcceptance = true
        }
      }
      if (allowedRoles.length) {
        const rolesOK = allowedRoles.some(role => (this.configSvc.userRoles as Set<string>).has(role))
        if (!rolesOK) {
          finalAcceptance = false
        } else {
          finalAcceptance = true
        }
      }
      if (!notAllowedRoles.length && !allowedRoles.length) {
        finalAcceptance = true
      }
    }
    // console.log(finalAcceptance)
    return finalAcceptance
  }
}
