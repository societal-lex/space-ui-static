import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import 'quill-mention'
import { NsUserDashboard } from '../../../../../../../project/ws/app/src/lib/routes/user-dashboard/models/user-dashboard.model'
import { ConfigurationsService } from '../../../../../utils/src/public-api'
import { WsDiscussionForumService } from '../ws-discussion-forum.services'
import { ActivatedRoute } from '@angular/router'
import { uniqBy } from 'lodash'
import { quillBaseConfig } from './config/quill-config'
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
    mentions?: object[]
  }>()
  @Output() mentionsData = new EventEmitter<any[]>()

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
    ...quillBaseConfig.modules,
    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ['@', '#'],

      source: (searchTerm: string, renderList: (arg0: { id: number; value: string }[], arg1: any) => void, mentionChar: string) => {
        let values
        if (mentionChar === '@') {
          this.getAllUsers()
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
      dataAttributes: ['id', 'value', 'data'],
    },
  }

  constructor(private configSvc: ConfigurationsService,
              private activateRoute: ActivatedRoute,
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

    this.activateRoute.data.subscribe(data => {
      if (data) {
        this.userDashboardData = data.socialData.data.userListData
        this.discussionForumService.setUserDashboardConfig(this.userDashboardData)
        this.getRootOrg = data.socialData.data.userListData.root_org,
          this.getOrg = data.socialData.data.userListData.org
      }
    })
  }

  onContentChanged(editorEvent: any) {
    const newList = this.emitMentionsEvent(editorEvent.content.ops)
    this.textData.emit({
      isValid: editorEvent.text.length > this.minLength,
      htmlText: editorEvent.html,
      text: editorEvent.text,
      mentions: newList,
    })
    this.mentionsData.emit(newList)
  }

  emitMentionsEvent(operations: any) {
    const mentions = operations.filter((op: any) => {
      return op.hasOwnProperty('insert') && typeof op.insert !== 'string'
    }).map((mention: any) => {
      // tslint:disable-next-line: max-line-length
      return {name: mention.insert.mention.value,
        id: mention.insert.mention.id,
        email: JSON.parse(mention.insert.mention.data).email,
    }
  },
    )
    const uniqueUsers = uniqBy(mentions, 'id')
    return uniqueUsers
  }

  resetEditor() {
    this.reset = true
    setTimeout(() => {
      this.reset = false
    },         0)
  }

  async getAllUsers() {
    this.headersForAllUsers.rootOrg = this.getRootOrg
    this.headersForAllUsers.org = this.getOrg
    this.headersForAllUsers.wid_OrgAdmin = this.widLoggedinUser
    const userListResponse = await this.discussionForumService.getAllUsers(this.headersForAllUsers)
    if (userListResponse.ok) {
      if (userListResponse.DATA != null) {
        this.userListData = userListResponse.DATA
        this.userListJson(this.userListData)
      }
      return this.errorOnLoading()
    }
    return this.errorOnLoading()
  }

  userListJson(userList: NsUserDashboard.IUserListDataFromUserTable[] = []) {
    // tslint:disable-next-line: prefer-const
    let obj = []
    // tslint:disable-next-line: no-increment-decrement
    for (let i = 0; i < userList.length; i++) {
      // tslint:disable-next-line: prefer-template
      // const fullname = this.discussionForumService.getFullName({ user: userList[] })
      // tslint:disable-next-line: prefer-template
      const fullname = userList[i].first_name + ' ' + userList[i].last_name
      // tslint:disable-next-line: object-literal-key-quotes
      obj.push({ 'id': userList[i].wid, 'value': fullname, data: JSON.stringify({email: userList[i].email }) })
    }
    this.userDataInJsonFormat = obj
    return this.userDataInJsonFormat
  }

  errorOnLoading() {
    const errorObj = []
    errorObj.push({ id: -1, value: 'Could not fetch user data' })
    return errorObj
  }
}
