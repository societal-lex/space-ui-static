import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core'
import { IRegsiterDetailObject } from './../../services/register-user-core.model'
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
  encapsulation: ViewEncapsulation.Emulated,
})
export class UserListComponent implements OnInit {
  navBackground: Partial<NsPage.INavBackground> = this.configSvc.pageNavBar
  placeHolder: String = 'Search'

  constructor(private configSvc: ConfigurationsService) {
    // var filteruser = [...new Set(this.users)]

    // const filteruser = [...new Set(this.users.map(x => x.employment_status))]

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

    // const val = new Set(this.users.map(user => user.employment_status))

  }
  @Input() users: IRegsiterDetailObject[] = []

  @Output() selectedUser = new EventEmitter<object | null>()

  // @Input('rating') private rating: any
  // @Input('starCount') private starCount: any
  // // @Input('color') private color: any
  // @Output() private ratingUpdated = new EventEmitter();
  // private snackBarDuration: number = 2000;

  // private ratingArr = []

  // filteruser: IRegsiterDetailObject[] = []
  // dataSource = new MatTableDataSource(this.users);

  // const filteruser = new Set(this.users.map(x => x.employment_status));
  // const uniqueWorkflowData = lodash.uniqBy(stats, 'workflow');

  searchText: any
  filterStatus: any
  filterLocation: any
  filterCombo: any[] = []
  myarrayStatus: any
  myarrayLocation: any
  currentRate = 5
  stars = [1, 2, 3, 4, 5]
  rating = 1
  hoverState = 0
  selectedValue: any

  ngOnInit() {

    this.filterUser()
  }

  filterUser() {

    // this.filterStatus = new Set(this.users.map(x => x.employment_status))
    const filterStatus: any = new Set(this.users.map(x => x.employment_status))

    this.myarrayStatus = Array.from(filterStatus)
    // this.filterLocation = new Set(this.users.map(x => x.residence_city))
    const filterLocation: any = new Set(this.users.map(x => x.residence_city))

    this.myarrayLocation = Array.from(filterLocation)
    // this.filterCombo =
    // this.myarrayLocation.map((location: any) => {
    //   this.myarrayStatus.map((status: any) => {
    //     let combo: any = {
    //       location: location,
    //       status: status
    //     }
    //     this.filterCombo.push(combo)
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
  // }

  // usage example:

  // countStar(star: any) {
  //   this.selectedValue = star
  //   console.log('Value of star', star)
  // }

  onStarEnter(starId: any) {
    this.hoverState = starId

  }
  onStarLeave() {
    this.hoverState = 0
  }
  onStarClick(starId: any) {
    this.rating = starId
  }

}
