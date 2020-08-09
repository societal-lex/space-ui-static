import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router' // CLI imports router
import { RegisteredUsersComponent } from './registered-users.component'
import { UserdeatilsComponent } from './components/userdeatils/userdeatils.component'
import { UserDetailResolverService } from '../../../services/user-detail-resolver.service'
// import { CompletioncertficateComponent } from '../certificates/components/completioncertficate/completioncertficate.component'

const routes: Routes = [
  {
    path: '',
    component: RegisteredUsersComponent
  },
  {
    path: 'detail/:userID',
    component: UserdeatilsComponent,
    resolve: {
      details: UserDetailResolverService
    },
  }
] // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisteredUsersRoutingModule { }
