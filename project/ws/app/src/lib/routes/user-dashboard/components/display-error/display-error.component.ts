import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'ws-app-display-error',
  templateUrl: './display-error.component.html',
  styleUrls: ['./display-error.component.scss'],
})
export class DisplayErrorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DisplayErrorComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }
  email: string[] = []
  ngOnInit() {
    if (this.data) {
      this.email = this.data
    }
  }
}
