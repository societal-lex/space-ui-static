import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

interface IDialogData {
  items: {
    name: string,
    details: string
  }[],
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ws-author-license-info-display-dialog',
  templateUrl: './license-info-display-dialog.component.html',
  styleUrls: ['./license-info-display-dialog.component.scss'],
})
export class LicenseInfoDisplayDialogComponent implements OnInit {

  public dataSource: IDialogData['items'] = []
  public columnSequence = ['Sno', 'License', 'Details', 'Link']

  constructor(
    public dialogRef: MatDialogRef<LicenseInfoDisplayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ) { }

  ngOnInit() {
    if (this.data.items.length) {
     this.dataSource = this.data.items.map((item, idx) => {
        return {
          index: idx,
          ...item,
        }
      })
      // console.log('mapped data now is ', this.dataSource)
    }
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

}
