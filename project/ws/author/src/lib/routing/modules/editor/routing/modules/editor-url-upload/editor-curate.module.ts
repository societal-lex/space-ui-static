import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorCustomUrlUploadComponent } from './components/editor-custom-url-upload/editor-custom-url-upload.component';
import { ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from '@ws/author/src/lib/modules/shared/shared.module';
import { EditorCustomFileUploadComponent } from './components/editor-custom-file-upload/editor-custom-file-upload.component';

@NgModule({
  declarations: [EditorCustomUrlUploadComponent, EditorCustomFileUploadComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    EditorCustomUrlUploadComponent,
    EditorCustomFileUploadComponent,
  ],
})
export class EditorUrlUploadModule { }
