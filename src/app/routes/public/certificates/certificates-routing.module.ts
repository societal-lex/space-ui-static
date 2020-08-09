import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CompletioncertficateComponent } from './components/completioncertficate/completioncertficate.component'

const routes: Routes = [
  {
    path: ':stage/:userid',
    component: CompletioncertficateComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificatesRoutingModule {
  constructor() {
  }
}
