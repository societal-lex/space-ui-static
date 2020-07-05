import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InterestComponent } from './interest/interest.component'
import { HorizontalScrollerModule } from '../../../../../../../../../library/ws-widget/utils/src/public-api'
import { MatCardModule, MatProgressSpinnerModule, MatCheckboxModule, MatButtonModule, MatIconModule, MatToolbarModule } from '@angular/material'
import { BtnPageBackModule } from '../../../../../../../../../library/ws-widget/collection/src/public-api'
import { InterestService } from '../../../profile/routes/interest/services/interest.service'
import { MatChipsModule } from '@angular/material/chips'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatSelectModule } from '@angular/material/select'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
// import { PipeLimitToModule } from '@ws-shared/util'

import { PipeLimitToModule } from '@ws-widget/utils'

@NgModule({
  declarations: [InterestComponent],
  imports: [
    CommonModule,
    HorizontalScrollerModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    BtnPageBackModule,
    MatChipsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    PipeLimitToModule,

  ],
  exports: [InterestComponent],
  providers: [InterestService],
})
export class InterestModules { }
