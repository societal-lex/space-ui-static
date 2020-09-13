import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import 'quill-mention'
import { NsUserDashboard } from '../../../../../../../project/ws/app/src/lib/routes/user-dashboard/models/user-dashboard.model'
import { ConfigurationsService } from '../../../../../utils/src/public-api'
import { WsDiscussionForumService } from '../ws-discussion-forum.services'
@Component({
  selector: 'ws-widget-editor-quill',
  templateUrl: './editor-quill.component.html',
  styleUrls: ['./editor-quill.component.scss'],
})
export class EditorQuillComponent implements OnInit {
  modules = {}
  @Output() textData = new EventEmitter<{
    isValid: boolean
    htmlText: string
    text: string
  }>()

  @Input() htmlText = ''
  @Input() minLength = '1'
  @Input() post ?= false

  text = ''

  reset = false
  placeholder = 'Ask a question, or add something you found helpful'
  headersForAllUsers: NsUserDashboard.IHeaders = {} as any
  userDashboardData: NsUserDashboard.IUserData | any
  widLoggedinUser: string | any
  userListData: NsUserDashboard.IUserListDataFromUserTable[] = []
  getRootOrg: string | any
  getOrg: string | any
  userDataInJsonFormat: any

  quillConfig = {
    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ['@', '#'],
      source: (searchTerm: string, renderList: (arg0: { id: number; value: string }[], arg1: any) => void, mentionChar: string) => {
        let values

        if (mentionChar === '@') {
          this.getAllUsers()

          values = this.userDataInJsonFormat
        } else {
          values = this.userDataInJsonFormat
        }

        if (searchTerm.length === 0) {
          renderList(values, searchTerm)
        } else {
          const matches = []
          // tslint:disable-next-line: no-increment-decrement
          for (let i = 0; i < values.length; i++) {
            // tslint:disable-next-line: no-bitwise
            if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())) { matches.push(values[i]) }
          }
          renderList(matches, searchTerm)
        }
      },
    },
  }

  constructor(private configSvc: ConfigurationsService,
              private discussionForumService: WsDiscussionForumService) {
    const instanceConfig = this.configSvc.userProfile
    if (instanceConfig) {
      this.widLoggedinUser = instanceConfig.userId
    }
  }

  ngOnInit() {
    if (this.post) {
      this.placeholder = 'Add a post ...'
    }
    // this.activateRoute.data.subscribe(data => {
    //   if (data) {
    //     console.log("data", data)
    //     this.userDashboardData = data.pageData.data
    //     this.discussionForumService.setUserDashboardConfig(this.userDashboardData)
    //   this.getRootOrg = data.pageData.data.root_org,
    //     this.getOrg = data.pageData.data.org
    //   }
    // })

  }

  onContentChanged(editorEvent: any) {
    this.textData.emit({
      isValid: editorEvent.text.length > this.minLength,
      htmlText: editorEvent.html,
      text: editorEvent.text,
    })
  }

  resetEditor() {
    this.reset = true
    setTimeout(() => {
      this.reset = false
    },         0)
  }

  async getAllUsers() {
    this.headersForAllUsers.rootOrg = 'space'
    this.headersForAllUsers.org = 'space'
    this.headersForAllUsers.wid_OrgAdmin = this.widLoggedinUser
    const userListResponse = await this.discussionForumService.getAllUsers(this.headersForAllUsers)
    if (userListResponse.ok) {
      if (userListResponse.DATA != null) {
        this.userListData = userListResponse.DATA
        this.userListJson(this.userListData)
      }
    }
  }

  userListJson(userList: NsUserDashboard.IUserListDataFromUserTable[] = []) {
    // tslint:disable-next-line: prefer-const
    let obj = []
    // tslint:disable-next-line: no-increment-decrement
    for (let i = 0; i < userList.length; i++) {
      // tslint:disable-next-line: prefer-template
      const fullname = userList[i].first_name + ' '  + userList[i].last_name
      // tslint:disable-next-line: object-literal-key-quotes
      obj.push({ 'id': i, 'value': fullname })
    }
    this.userDataInJsonFormat = obj
  }
}
