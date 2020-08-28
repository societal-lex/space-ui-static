import { Injectable } from '@angular/core'
import {
  IFeedbackFilterObj,
  IFeedbackSearchQuery,
  EFeedbackType,
  FeedbackService,
  IFeedback,
  EFeedbackRole,
} from '@ws-widget/collection'
import { Observable } from 'rxjs'
import { ConfigurationsService } from '../../../../../../../../../../library/ws-widget/utils/src/public-api'

@Injectable()
export class MyFeedbackService {
  constructor(
    private feedbackApi: FeedbackService,
    private configSvc: ConfigurationsService
  ) { }

  initFilterObj(viewedBy: EFeedbackRole): IFeedbackFilterObj {
    switch (viewedBy) {
      case EFeedbackRole.User:
        return { showLimited: false }

      case EFeedbackRole.Author:
        return { showLimited: false, feedbackType: [EFeedbackType.Content] }

      case EFeedbackRole.Platform:
        return { showLimited: false, feedbackType: [EFeedbackType.Platform] }

      case EFeedbackRole.Content:
        return { showLimited: false, feedbackType: [EFeedbackType.ContentRequest] }

      case EFeedbackRole.Service:
        return { showLimited: false, feedbackType: [EFeedbackType.ServiceRequest] }

      default:
        return { showLimited: false }
    }
  }

  getSearchObj(
    filterObj: IFeedbackFilterObj,
    viewedBy: EFeedbackRole,
    pageNo: number,
    pageSize: number,
    query?: string,
  ): IFeedbackSearchQuery {
    const searchObj: IFeedbackSearchQuery = {
      viewedBy,
      query: query || '',
      filters: {},
      all: !filterObj.showLimited,
      from: pageNo,
      size: pageSize,
    }

    if (filterObj.contentType && filterObj.contentType.length) {
      searchObj.filters['contentType'] = filterObj.contentType
    }

    if (filterObj.feedbackType && filterObj.feedbackType.length) {
      searchObj.filters['feedbackType'] = filterObj.feedbackType
    }

    return searchObj
  }

  submitReply(feedbackReply: IFeedback): Observable<any> {
    try {
      let submission$: Observable<any>
      switch (feedbackReply.type) {
        case EFeedbackType.Content:
          submission$ = this.feedbackApi.submitContentFeedback(feedbackReply)
          break

        case EFeedbackType.Platform:
          submission$ = this.feedbackApi.submitPlatformFeedback(feedbackReply)
          break

        case EFeedbackType.ContentRequest:
          submission$ = this.feedbackApi.submitContentRequest(feedbackReply)
          break

        case EFeedbackType.ServiceRequest:
          submission$ = this.feedbackApi.submitServiceRequest(feedbackReply)
          break

        default:
          submission$ = this.feedbackApi.submitPlatformFeedback(feedbackReply)
      }

      return submission$
    } catch (e) {
      return this.feedbackApi.submitPlatformFeedback(feedbackReply)
    }
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
