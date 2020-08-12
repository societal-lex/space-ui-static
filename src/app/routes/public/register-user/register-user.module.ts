import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RegisterUserCoreService } from './services/register-user-core.service'
import { UserListComponent } from './components/user-list/user-list.component'
import { UserdeatilsComponent } from './components/userdeatils/userdeatils.component'
import { RegisteredUsersComponent } from './registered-users.component'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { RegisteredUsersRoutingModule } from './registered-users-routing.module'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
// import { BtnPageBackComponent } from '../../../../../library/ws-widget/collection/src/lib/btn-page-back/btn-page-back.component'
// import { ConfigurationsService } from '@ws-widget/utils'
import { MatInputModule } from '@angular/material/input'
import { MatToolbarModule } from '@angular/material/toolbar'
import { FilterPipe } from './pipes/filter.pipe'
import { MatAutocompleteModule, MatTooltipModule } from '@angular/material'
import { BtnPageBackModule } from '../../../../../library/ws-widget/collection/src/lib/btn-page-back/btn-page-back.module'
import { MatSelectModule } from '@angular/material/select'
import { CertificatesModule } from '../certificates/certificates.module'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { StarComponent } from './components/star/star.component'
import { UserFilterComponent } from './components/user-filter/user-filter.component'

@NgModule({
  declarations: [
    RegisteredUsersComponent,
    UserListComponent,
    UserdeatilsComponent,
    FilterPipe,
    StarComponent,
    UserFilterComponent,

  ],
  providers: [RegisterUserCoreService],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatAutocompleteModule,
    BtnPageBackModule,
    MatSelectModule,
    RegisteredUsersRoutingModule,
    CertificatesModule,
    NgbModule,
    HttpClientModule,
    MatTooltipModule,

  ],
  exports: [
    RegisteredUsersComponent, UserListComponent, UserdeatilsComponent, StarComponent, UserFilterComponent,
  ],
})
export class RegisterUserModule { }
