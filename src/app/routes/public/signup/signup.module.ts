import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SignupComponent } from './signup/signup.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { SignUpRoutingModule } from './signup-routing.module'
import { ReactiveFormsModule } from '@angular/forms'
import { MatToolbarModule } from '@angular/material/toolbar'
import { BtnPageBackModule } from '../../../../../library/ws-widget/collection/src/lib/btn-page-back/btn-page-back.module'

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    BtnPageBackModule,
  ]
  , exports : [SignupComponent],
})
export class SignupModule {}
