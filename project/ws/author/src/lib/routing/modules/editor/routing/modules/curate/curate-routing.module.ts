import { CurateComponent } from './components/curate/curate.component'
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { InitResolver } from '@ws/author/src/lib/services/init-resolve.service'

const routes: Routes = [
  {
    path: '',
    data: {
      load: ['meta', 'license'],
    },
    resolve: {
      script: InitResolver,
    },
    component: CurateComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurateRoutingModule { }
