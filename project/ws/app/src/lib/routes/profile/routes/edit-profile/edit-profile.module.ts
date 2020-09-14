import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { MatCardModule, MatInputModule, MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatSnackBarModule } from '@angular/material'
import { EditProfileComponent } from './edit-profile.component'

@NgModule({
  declarations: [EditProfileComponent],
  imports: [
    CommonModule, MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSnackBarModule,
    ReactiveFormsModule, FormsModule,

  ],
})
export class EditProfileModule { }
