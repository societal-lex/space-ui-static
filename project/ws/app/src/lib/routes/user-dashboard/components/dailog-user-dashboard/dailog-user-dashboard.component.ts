import { Component, OnInit, Inject } from '@angular/core'
import { NsUserDashboard } from '../../models/user-dashboard.model'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

@Component({
  selector: 'ws-app-dailog-user-dashboard',
  templateUrl: './dailog-user-dashboard.component.html',
  styleUrls: ['./dailog-user-dashboard.component.scss'],
})
export class DailogUserDashboardComponent implements OnInit {
  // userDashboardDataForDailog: NsUserDashboard.IDailogData | null = null
  constructor(
    public dialogRef: MatDialogRef<DailogUserDashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NsUserDashboard.IDailogData) {
    }

  ngOnInit() {

    // this.userDashboardDataFromConfig = this.activateRoute.data.subscribe(data => {
    //   // todo
    //   this.userDashboardDataForDailog = data.pageData.data
    // })
  }
  onNoClick(): void {
    this.dialogRef.close()
  }
}
