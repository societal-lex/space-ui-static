import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import * as XLSX from 'xlsx'

type AOA = any[]
@Component({
  selector: 'ws-app-display-error',
  templateUrl: './display-error.component.html',
  styleUrls: ['./display-error.component.scss'],
})
export class DisplayErrorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DisplayErrorComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }
  email: string[] = []
  dataToBeDisplayed: AOA = [[]]
  ngOnInit() {
    if (this.data) {
      this.dataToBeDisplayed = [['Email'], this.data]
      this.email = this.data
    }
  }
  displayUsers() {
    this.export(this.dataToBeDisplayed, 'FailedUsers.xlsx')
  }
  export(data: AOA, fileName: string): void {

    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data)

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'UserDetails')

    /* save to file */
    XLSX.writeFile(wb, fileName)
  }
}
