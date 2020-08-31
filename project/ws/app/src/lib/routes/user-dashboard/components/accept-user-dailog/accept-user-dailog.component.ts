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
  username = ''
  userDashboardDataFromConfig: Subscription | null = null
  userDataFromConfig: NsUserDashboard.IUserData | any | null
  defaultRoles: string[] = []
  constructor(
    public dialogRef: MatDialogRef<AcceptUserDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
  ) {
    this.username = this.data.userName
    this.form = this.formBuilder.group({
      orders: new FormArray([], Validators.required),
    })
    this.defaultRoles = this.data.defaultRoles

    this.showAllRoles()
    this.rolesForSelection()
  }
  ngOnInit() {
  }
  showAllRoles() {
    // tslint:disable-next-line: no-var-keyword
    var jsonstr = '{"values":[]}'
    // tslint:disable-next-line: prefer-const
    let objForAllRoles = JSON.parse(jsonstr)
    if (this.data.allRoles.length) {
      this.data.allRoles.forEach((element: string, index: any) => {
        if (this.defaultRoles.includes(element)) {
          this.data.allRoles[index] = 'default'
        }
      })
    }

    const unique = [...new Set(this.data.allRoles)]

    unique.forEach((element: any, index: any) => {
      if (element === 'default') {
        const filterData = unique.splice(index, 1)
        unique.splice((unique.length), 0, filterData[0])
      }
    })
    // tslint:disable-next-line: no-increment-decrement
    for (let i = 0; i < unique.length; i++) {
      // tslint:disable-next-line: object-literal-key-quotes
      objForAllRoles['values'].push({ 'id': i, 'name': unique[i] })
    }
    jsonstr = JSON.stringify(objForAllRoles)
    // tslint:disable-next-line: prefer-const
    let obj1 = JSON.parse(jsonstr)
    this.ordersData = obj1.values
  }

  rolesForSelection() {
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
    jsonstrForInsertion = JSON.stringify(obj)
    // tslint:disable-next-line: prefer-const
    let obj2 = JSON.parse(jsonstrForInsertion)
    this.selection = obj2.values
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

    const index = this.selection.findIndex((u: { id: any }) => u.id === id)
    if (index === -1) {
      this.selection = [...this.selection, item]
    } else {
      this.selection = this.selection.filter((user: { id: any }) => user.id !== item.id)
    }
  }

  save() {
    const name = this.selection.map((v: any, i: any) => v ? this.selection[i]['name'] : null)
      .filter((v: null) => v !== null)
    if (this.defaultRoles) {
      this.defaultRoles.forEach(role => {
        name.push(role)
      })
    }
    this.defaultRoles = []
    this.dialogRef.close({ event: '', data: name })
  }

  isDisabled(item: any) {
    if (item.name === 'default') {
      return true
    }
    return false
  }
}
