import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material'
import { RouterModule } from '@angular/router'
import { BtnCatalogComponent } from './btn-catalog.component'
import { TreeCatalogModule } from '../tree-catalog/tree-catalog.module'

@NgModule({
  declarations: [BtnCatalogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    TreeCatalogModule,
    RouterModule,
  ],
  entryComponents: [BtnCatalogComponent],
})
export class BtnCatalogModule { }
