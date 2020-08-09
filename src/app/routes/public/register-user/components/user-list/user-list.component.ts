import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { RegsiterDetailObject } from './../../services/register-user-core.model'
// import { filter } from 'rxjs/operators'
// import { MatTableDataSource } from '@angular/material/table'
// import { MatFormFieldControl } from '@angular/material'
import { ConfigurationsService, NsPage } from '@ws-widget/utils'
// import { lodash_ } from 'lodash'

// import * as lodash from 'lodash'
// import _ from 'lodash';

@Component({
  selector: 'user-list-component',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  pageNavbar: Partial<NsPage.INavBackground> = this.configSvc.pageNavBar

  constructor(private configSvc: ConfigurationsService) {
    // var filteruser = [...new Set(this.users)]

    // const filteruser = [...new Set(this.users.map(x => x.employment_status))]

    // console.log(":**********", filteruser)
    // const result = []
    // const map = new Map()
    // for (const item of this.users) {
    //   if (map.has(item.employment_status)) {
    //     map.set(item.employment_status, true)    // set any value to Map
    //     result.push({
    //       id: item.employment_status

    //     })
    //   }
    // }
    // console.log("result", result)

    // const val = new Set(this.users.map(user => user.employment_status))

  }
  @Input() users: RegsiterDetailObject[] = []

  @Output() selectedUser = new EventEmitter<object | null>()
  // filteruser: RegsiterDetailObject[] = []
  // dataSource = new MatTableDataSource(this.users);

  // const filteruser = new Set(this.users.map(x => x.employment_status));
  // const uniqueWorkflowData = lodash.uniqBy(stats, 'workflow');

  searchText: any
  filteruser_status: any
  filteruser_location: any
  filtercombo: any[] = []
  myarraystatus: any
  myarraylocation: any

  ngOnInit() {
    this.filterUser()
  }
  filterUser() {

    // this.filteruser_status = new Set(this.users.map(x => x.employment_status))
    const filteruser_status: any = new Set(this.users.map(x => x.employment_status))

    this.myarraystatus = Array.from(filteruser_status)
    console.log('filteruser_status', filteruser_status)
    // this.filteruser_location = new Set(this.users.map(x => x.residence_city))
    const filteruser_location: any = new Set(this.users.map(x => x.residence_city))

    this.myarraylocation = Array.from(filteruser_location)
    // console.log("filteruser_location", filteruser_location)
    // this.filtercombo =
    // this.myarraylocation.map((location: any) => {
    //   this.myarraystatus.map((status: any) => {
    //     let combo: any = {
    //       location: location,
    //       status: status
    //     }
    //     this.filtercombo.push(combo)
    //     console.log("++++++++combo", combo)
    //     // return combo
    //   })
    // })

  }

  viewUserDetails(_userObj: any) {
    if (_userObj) {
      this.selectedUser.emit(_userObj)
    }

  }

  //   function onlyUnique(value: any, index: any, self: any) {
  //     return self.indexOf(value) === index
  //   }

  // var  unique = this.users.employment_status.filter(onlyUnique);

  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase()
  // }

  // selectPost(registeredUser: any) {
  //   console.log(`The selected post is::  ${registeredUser.residence_city}`)
  // }

  // usage example:

}
