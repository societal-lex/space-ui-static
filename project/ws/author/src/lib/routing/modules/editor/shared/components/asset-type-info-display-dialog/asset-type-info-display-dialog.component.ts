import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

interface IDialogData {
  items: {
    type: string,
    description: string
  }[],
}

@Component({
  selector: 'ws-auth-asset-type-info-display-dialog',
  templateUrl: './asset-type-info-display-dialog.component.html',
  styleUrls: ['./asset-type-info-display-dialog.component.scss'],
})
export class AssetTypeInfoDisplayDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AssetTypeInfoDisplayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData) { }
  public dataSource: IDialogData['items'] = []
  public columnSequence = ['SlNo', 'Type', 'Description']
  ngOnInit() {
    if (this.data.items.length) {
      this.dataSource = this.data.items.map((item, idx) => {
        return {
          index: idx + 1,
          ...item,
        }
      })
    }
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

}
