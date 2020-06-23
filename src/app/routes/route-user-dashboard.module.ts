import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserDashboardModule } from '@ws/app/src/lib/routes/user-dashboard/user-dashboard.module'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserDashboardModule,
  ],
  exports: [UserDashboardModule],
})
export class RouteUserDashboardModule {
}
