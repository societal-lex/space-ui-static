import { Component, OnInit, ViewChild } from '@angular/core'
import { UserDashboardService } from '../../services/user-dashboard.service'
import { ActivatedRoute } from '@angular/router'
import { Subscription, Observable } from 'rxjs'
import { NsUserDashboard } from '../../models/user-dashboard.model'
import { FormControl } from '@angular/forms'
import { ConfigurationsService, NsPage } from '@ws-widget/utils/src/public-api'
import { MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material'
import { AcceptUserDailogComponent } from '../accept-user-dailog/accept-user-dailog.component'
import { DailogUserDashboardComponent } from '../dailog-user-dashboard/dailog-user-dashboard.component'
import { SelectionModel } from '@angular/cdk/collections'

@Component({
  selector: 'ws-app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {

  userDashboardDataFromConfig: Subscription | null = null
  userDashboardData: NsUserDashboard.IUserData | any

  navBackground: Partial<NsPage.INavBackground> | null = null
  selectedRow: NsUserDashboard.IUserListData[] = []
  constructor(private userDashboardSvc: UserDashboardService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private activateRoute: ActivatedRoute,
    private configSvc: ConfigurationsService
  ) {

    const instanceConfig = this.configSvc.userProfile
    if (instanceConfig) {
      this.widLoggedinUser = instanceConfig.userId
    }
  }
  public userList!: NsUserDashboard.IUserListData | undefined
  employees = this.userList
  //  public userListArray: NsUserDashboard.IUserListData[] =[]
  public selectedVal: string | any
  myControl = new FormControl()
  searchForName: string[] = []
  options: string[] = this.searchForName
  filteredOptions: Observable<string[]> | any
  headersForAllUsers: NsUserDashboard.IHeaders = {} as any
  widLoggedinUser: string | any
  getRootOrg: string | any
  getOrg: string | any
  userListArray: NsUserDashboard.IUserListData[] = []
  // @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator | any
  @ViewChild(MatSort, { static: false }) sort!: MatSort
  dataSource: MatTableDataSource<NsUserDashboard.IUserListData> | any
  selection = new SelectionModel<NsUserDashboard.IUserListData>(true, [])

  getUserData: NsUserDashboard.IGetUserData = {} as any
  displayedColumns =
    ['select', 'SlNo', 'firstName', 'email', 'Actions']
  allroles!: NsUserDashboard.IRoles
  paramsForChangeRole: NsUserDashboard.IChangeRole = {} as any
  roles: string[] = []
  widUser = ''
  headersForChangeUserRole: NsUserDashboard.IHeaders = {} as any
  userdefaultRoles: NsUserDashboard.IRoles | null = null
  userDashboardDataForDailog!: NsUserDashboard.IDailogData
  paramsForDecline: NsUserDashboard.IDeclineUser = {} as any
  isConfirmed!: Boolean
  headersForRejectUser: NsUserDashboard.IHeaders = {} as any
  isLoad = false
  errorMessage!: string
  email = ''
  // @ViewChild(MatSort,{static: true}) sort: MatSort | undefined;
  // dataSource = new MatTableDataSource<NsUserDashboard.IUserListData>(this.userListArray);
  // dataSource = new MatTableDataSource(this.searchForName);
  //  public userListDataForTable: NsUserDashboard.IUserListData
  //  | undefined
  //  public userListDataForTable: NsUserDashboard.IUserListData

  // @ViewChild(MatSort,{static: true}) sort: MatSort | undefined;
  // dataSource = new MatTableDataSource<NsUserDashboard.IUserListData>(this.userListArray);
  // dataSource = new MatTableDataSource(this.searchForName);

  //  public userListDataForTable: NsUserDashboard.IUserListData
  //  | undefined
  //  public userListDataForTable: NsUserDashboard.IUserListData

  ngOnInit() {
    this.userDashboardDataFromConfig = this.activateRoute.data.subscribe(data => {
      // todo
      this.userDashboardData = data.pageData.data
      this.userDashboardDataForDailog = data.pageData.data.dailog_data,
        this.userdefaultRoles = data.pageData.data.defaultRoles.roles,
        this.errorMessage = data.pageData.data.user_list.errorMessage

      this.userDashboardSvc.setUserDashboardConfig(this.userDashboardData)
      this.getRootOrg = data.pageData.data.root_org,
        this.getOrg = data.pageData.data.org
      this.navBackground = this.configSvc.pageNavBar
    })
    this.selectedVal = 'all'
    this.getAllUsers(this.selectedVal)

  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  // ngOnDestroy() {
  //   this.loaderService.changeLoad.next(false)
  // }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length
    const numRows = this.dataSource.data.length
    return numSelected === numRows
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: NsUserDashboard.IUserListData) => this.selection.select(row))
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: NsUserDashboard.IUserListData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.email}`
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase() // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue

  }
  async getAllUsers(value: string) {
    this.isLoad = true
    this.headersForAllUsers.rootOrg = this.getRootOrg
    this.headersForAllUsers.org = this.getOrg
    this.headersForAllUsers.wid_OrgAdmin = this.widLoggedinUser
    // this.loaderService.changeLoad.next(true)
    // this.selectedVal = value
    // console.log("selectedvalue", this.selectedVal)

    const userListResponse = await this.userDashboardSvc.getAllUsers(value, this.headersForAllUsers)
    if (userListResponse.ok) {
      if (userListResponse.DATA != null) {
        this.userListArray = userListResponse.DATA
        // this.enableFilter(this.userListArray)
        // tslint:disable-next-line: no-console
        this.userListArray = userListResponse.DATA
        // the datasource contains email verified users.
        this.dataSource = new MatTableDataSource<NsUserDashboard.IUserListData>(this.enableFilter(this.userListArray))
        if (this.dataSource != null) {
          this.isLoad = false
        }
        setTimeout(() => {
          // this.dataSource.paginator = this.paginator
          // tslint:disable-next-line: brace-style
          this.dataSource.sort = this.sort
        })
      }
    }
  }

  enableFilter(userData: any) {
    // tslint:disable-next-line: no-boolean-literal-compare
    return userData.filter((items: { emailVerified: boolean }) => items.emailVerified === true)
  }

  async changeRole(element: any) {

    this.isLoad = true
    this.userDashboardSvc.fetchPublishersList(element.email).subscribe(async data => {
      this.getUserData.roles = []
      if (data.length) {
        this.getUserData = data[0]
        this.getUserData.roles = data[0].roles
        this.roles = this.getUserData.roles
        this.email = data[0].mail
        console.log('this.roles', this.roles)
        this.widUser = data[0].id
      } else {
        this.roles = []
      }
      const getAllRoles = await this.userDashboardSvc.getAllRoles(this.getRootOrg, this.widLoggedinUser, this.getOrg)
      if (getAllRoles && this.roles) {
        this.isLoad = false
        const dialogResponseForChangeRoles = this.dialog.open(AcceptUserDailogComponent, {
          width: '400px',
          // height: '300px',
          data: {
            allRoles: getAllRoles.DATA,
            defaultValueToBeChecked: this.roles,
          },
        })
        dialogResponseForChangeRoles.afterClosed().subscribe(result => {
          this.allroles = result.data
          if (this.allroles) {
            this.changeUserRoles(this.allroles, this.widUser)
          }
        })
      }
    })
  }
  async  changeUserRoles(roles: any, getwid: any) {
    this.headersForChangeUserRole.rootOrg = this.getRootOrg
    this.headersForChangeUserRole.org = this.getOrg
    this.headersForChangeUserRole.wid_OrgAdmin = this.widLoggedinUser
    this.paramsForChangeRole.wid = getwid,
      this.paramsForChangeRole.roles = []
    this.paramsForChangeRole.roles = roles
    this.paramsForChangeRole.roles.push('privileged')
 this.paramsForChangeRole.email = this.email
    const userChangedRoleResponse = await this.userDashboardSvc.changeRoles(this.paramsForChangeRole, this.headersForChangeUserRole)
    if (userChangedRoleResponse.ok) {
      this.paramsForChangeRole.wid = ''
      this.paramsForChangeRole.roles = []
      this.paramsForChangeRole.email = ''
      this.email = ''
      this.widUser = ''
      this.roles = []
      this.getUserData.roles = []
      // tslint:disable-next-line: no-non-null-assertion
      this.snackBar.open(userChangedRoleResponse.MESSAGE, '', {
        duration: 3000,
      })
    } else {
      this.snackBar.open(userChangedRoleResponse.MESSAGE, '', {
        duration: 3000,
      })
    }
  }

  openDialogForReject(element: any) {
    const dialogResponse = this.dialog.open(DailogUserDashboardComponent, {
      width: '300px',
      data: {
        title: this.userDashboardDataForDailog.title,
        body: this.userDashboardDataForDailog.body,
        userName: element.firstName + element.lastName,
        email: element.email,
      },
    })

    dialogResponse.afterClosed().subscribe(result => {
      this.isConfirmed = result
      if (this.isConfirmed) {
        this.deleteUser(this.paramsForDecline, element)
      }
    })
  }

  async deleteUser(paramsForDecline: NsUserDashboard.IDeclineUser, element: any) {

    if (typeof (paramsForDecline.email) === 'undefined') {
      paramsForDecline.email = element.email
      paramsForDecline.user_Id = element.id
    }
    this.headersForRejectUser.rootOrg = this.getRootOrg
    this.headersForRejectUser.org = this.getOrg
    this.headersForRejectUser.wid_OrgAdmin = this.widLoggedinUser
    const userDeletedResponse = await this.userDashboardSvc.deleteUser(paramsForDecline, this.headersForRejectUser)
    if (userDeletedResponse.ok) {
      // tslint:disable-next-line: no-non-null-assertion
      this.snackBar.open(userDeletedResponse.MESSAGE, '', {
        duration: 3000,
      })
    } else {
      this.snackBar.open(userDeletedResponse.MESSAGE, '', {
        duration: 3000,
      })
    }

  }

  async bulkChangeRole() {
    this.isLoad = true
    this.selectedRow = this.selection.selected
    const getAllRolesForBulkChangeRole = await this.userDashboardSvc.getAllRoles(this.getRootOrg, this.widLoggedinUser, this.getOrg)
    console.log('getallrolws', getAllRolesForBulkChangeRole)

    if (getAllRolesForBulkChangeRole) {
      this.isLoad = false
      const dialogResponseForChangeRoles = this.dialog.open(AcceptUserDailogComponent, {
        width: '400px',
        // height: '300px',
        data: {
          allRoles: getAllRolesForBulkChangeRole.DATA,
          defaultValueToBeChecked: [],
        },
      })
      dialogResponseForChangeRoles.afterClosed().subscribe(result => {
        this.allroles = result.data
        if (this.allroles) {
          console.log('roles', this.allroles)
          // this.changeUserRoles(this.allroles, this.widUser)
        }
      })
    }
    // console.log('allseected', this.selection.isSelected)
    console.log('this.selewctedrow', this.selectedRow, typeof this.selectedRow)
  }
}
