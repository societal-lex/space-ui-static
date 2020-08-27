import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { EFeedbackType } from '@ws-widget/collection'

import { HomeComponent } from './components/home/home.component'
import { FeedbackComponent } from './components/feedback/feedback.component'
import { ContentRequestComponent } from './components/content-request/content-request.component'
import { ServiceRequestComponent } from './components/service-request/service-request.component'
import { FeedbackSummaryResolver } from '../../resolvers/feedback-summary.resolver'
import { FeedbackConfigResolver } from '../../resolvers/feedback-config.resolver'
import { GeneralGuard } from '../../../../../../../../../src/app/guards/general.guard'
import { PageResolve } from '../../../../../../../../../library/ws-widget/utils/src/public-api'

const routes: Routes = [
  {
    path: EFeedbackType.Platform,
    component: FeedbackComponent,

    data : {
      // requiredRoles: [
      //   'org-admin',
      //   'editor',
      //   'content-creator',
      //   'publisher',
      // ],
        pageType: 'feature',
        pageKey: 'feedback',
    },
    resolve: {
      feedbackConfig: FeedbackConfigResolver,
      pageData: PageResolve,
    },
    canActivate: [GeneralGuard],
  },
  {
    path: EFeedbackType.ContentRequest,
    component: ContentRequestComponent,
  },
  {
    path: EFeedbackType.ServiceRequest,
    component: ServiceRequestComponent,
  },
  {
    path: '',
    redirectTo: EFeedbackType.Platform,
  },
]

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        children: routes,
        resolve: {
          feedbackSummary: FeedbackSummaryResolver,
        },
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ProvideFeedbackRoutingModule {}
