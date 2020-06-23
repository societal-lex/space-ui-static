import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PublicCollaboratorsComponent } from './public-collaborators.component'
@NgModule({
  declarations: [PublicCollaboratorsComponent],
  imports: [
    CommonModule,
  ],
  exports: [PublicCollaboratorsComponent],
})
export class PublicCollaboratorsModule { }
