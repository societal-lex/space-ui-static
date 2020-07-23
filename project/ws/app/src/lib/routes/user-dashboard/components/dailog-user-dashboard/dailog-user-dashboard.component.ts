import { Component, OnInit, Inject } from '@angular/core'
import { NsUserDashboard } from '../../models/user-dashboard.model'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

@Component({
  selector: 'ws-app-dailog-user-dashboard',
  templateUrl: './dailog-user-dashboard.component.html',
  styleUrls: ['./dailog-user-dashboard.component.scss'],
})
export class DailogUserDashboardComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DailogUserDashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NsUserDashboard.IDailogData) {
    }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close()
  }
}
