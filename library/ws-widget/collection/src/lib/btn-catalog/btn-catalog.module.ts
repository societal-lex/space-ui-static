import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  MatButtonModule, MatIconModule, MatFormFieldModule,
  MatMenuModule, MatAutocompleteModule, MatInputModule,
} from '@angular/material'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BtnCatalogComponent } from './btn-catalog.component'
import { TreeCatalogModule } from '../tree-catalog/tree-catalog.module'

@NgModule({
  declarations: [BtnCatalogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    TreeCatalogModule,
    RouterModule,
  ],
  entryComponents: [BtnCatalogComponent],
})
export class BtnCatalogModule { }
