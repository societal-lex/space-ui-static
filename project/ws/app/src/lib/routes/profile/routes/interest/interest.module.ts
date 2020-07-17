import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InterestComponent } from './components/interest/interest.component'
// import { PipeLimitToModule } from '@ws-shared/util'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  MatButtonModule,
  MatSnackBarModule,
  MatChipsModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule,
  MatGridListModule,
  MatExpansionModule,
} from '@angular/material'
import { PipeLimitToModule } from '@ws-widget/utils'

@NgModule({
  declarations: [InterestComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatSnackBarModule,
    MatChipsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    PipeLimitToModule,
    MatExpansionModule,
  ],
  exports: [InterestComponent],
})
export class InterestModule { }
