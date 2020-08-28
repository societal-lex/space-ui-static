import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './components/home/home.component'
// import { PageResolve } from '../../../../../../../library/ws-widget/utils/src/public-api'

const routes: Routes = [
  {
    path: 'my-feedback',
    // data: {
    //   pageType: 'feature',
    //   pageKey: 'feedback',
    // },
    // resolve: {
    //   pageData: PageResolve,
    // },
    loadChildren: () =>
      import('./routes/my-feedback/my-feedback.module').then(u => u.MyFeedbackModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./routes/provide-feedback/provide-feedback.module').then(u => u.ProvideFeedbackModule),
  },
]

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        children: routes,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class FeedbackV2RoutingModule {}
