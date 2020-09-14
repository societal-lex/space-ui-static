import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TourVideoComponent } from './tour-video.component'

@NgModule({
  declarations: [TourVideoComponent],
  imports: [
    CommonModule,
  ],
  exports: [TourVideoComponent],
  entryComponents: [TourVideoComponent],
})
export class TourVideoModule { }
