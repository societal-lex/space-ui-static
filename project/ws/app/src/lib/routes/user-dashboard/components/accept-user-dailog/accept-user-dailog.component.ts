import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms'
import { NsUserDashboard } from '../../models/user-dashboard.model'
import { Subscription } from 'rxjs'

@Component({
  selector: 'ws-app-accept-user-dailog',
  templateUrl: './accept-user-dailog.component.html',
  styleUrls: ['./accept-user-dailog.component.scss'],
})
export class AcceptUserDailogComponent implements OnInit {
  dataRoles!: string[]
  form: FormGroup
  defaultValueToBeCheckedValue: string[] = []

  response!: NsUserDashboard.IRoles
  ordersData: any = []
  selection: any
  isTrue = false
  buttonName!: string
  userDashboardDataFromConfig: Subscription | null = null
  constructor(
    public dialogRef: MatDialogRef<AcceptUserDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      orders: new FormArray([], Validators.required),
    })

    // tslint:disable-next-line: no-var-keyword
    var jsonstr = '{"values":[]}'
    // tslint:disable-next-line: prefer-const
    let objForAllRoles = JSON.parse(jsonstr)
      if (data.allRoles.length) {
         data.allRoles.forEach((element:  string, index: any) => {
           // tslint:disable-next-line: brace-style
           // tslint:disable-next-line: align
           if (element === 'privileged') {

           data.allRoles[index] = 'default'
           }
         })
      }
    // tslint:disable-next-line: no-increment-decrement
    for (let i = 0; i < this.data.allRoles.length; i++) {
      // tslint:disable-next-line: object-literal-key-quotes
      objForAllRoles['values'].push({ 'id': i, 'name': this.data.allRoles[i] })
    }
    jsonstr = JSON.stringify(objForAllRoles)

    // tslint:disable-next-line: prefer-const
    let obj1 = JSON.parse(jsonstr)

    this.ordersData = obj1.values

    // tslint:disable-next-line: prefer-const
    let jsonstrForInsertion = '{"values":[]}'
    // tslint:disable-next-line: prefer-const
    let obj = JSON.parse(jsonstrForInsertion)
    // tslint:disable-next-line: no-increment-decrement
    for (let i = 0; i < this.data.defaultValueToBeChecked.length; i++) {
      this.ordersData.some((thisdata: { name: any; id: any }) => {
        if (thisdata.name === this.data.defaultValueToBeChecked[i]) {
          const id = thisdata.id
          // tslint:disable-next-line: object-literal-key-quotes
          obj['values'].push({ 'id': id, 'name': this.data.defaultValueToBeChecked[i] })
        }
      }
      )
    }
    jsonstr = JSON.stringify(obj)
    // tslint:disable-next-line: prefer-const
    let obj2 = JSON.parse(jsonstr)
    this.selection = obj2.values
  }
   ngOnInit() {

  }

getSelection(item: any) {
  if (item.name === 'default' || this.getSelectionsFromOtherItems(item)) {
    return true
  }
  return false
  // return this.selection.findIndex((s: { id: any; }) => s.id === item.id) !== -1
}
  getSelectionsFromOtherItems(item: any) {
    return this.selection.findIndex((s: { id: any }) => s.id === item.id) !== -1
  }
changeHandler(item: any, _event: KeyboardEvent) {
  const id = item.id

  const index = this.selection.findIndex((u: { id: any; }) => u.id === id)
  if (index === -1) {
    this.selection = [...this.selection, item]
  } else {
    this.selection = this.selection.filter((user: { id: any; }) => user.id !== item.id)
  }
}

save() {
 const name = this.selection.map((v: any, i: any) => v ? this.selection[i]['name'] : null)
    .filter((v: null) => v !== null)
  this.response = name
  this.dialogRef.close({ event: '', data: this.response })
}

  isDisabled(item: any) {
    if (item.name === 'default') {
      return true
    }
      return false
  }
}
