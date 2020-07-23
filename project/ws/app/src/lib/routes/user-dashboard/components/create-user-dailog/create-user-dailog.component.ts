import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'ws-app-create-user-dailog',
  templateUrl: './create-user-dailog.component.html',
  styleUrls: ['./create-user-dailog.component.scss'],
})
export class CreateUserDailogComponent implements OnInit {

isSingleUser = false
  selectedValue = ''
  selectedStatus: number | undefined
  eventEditForm: FormGroup | undefined
  defaultValue = false
  constructor(public dialogRef: MatDialogRef<CreateUserDailogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    // this.selectedValue = 'true'
    this.eventEditForm = new FormGroup({
      completed: new FormControl('true'),
    })
// this.eventEditForm.controls.completed.setValue('true')
    this.defaultValue = true
  }

  onNoClick(): void {
    this.dialogRef.close()
  }
  isCloseDailog(event: any) {

    if (event === true) {
      this.dialogRef.close()
    }
}
}
