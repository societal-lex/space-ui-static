import { Component, OnInit, Input } from '@angular/core'
import { ConfigurationsService } from '@ws-widget/utils'
import { MatSnackBar, MatDialog } from '@angular/material'
import { DialogSocialActivityUserComponent } from '../../dialog/dialog-social-activity-user/dialog-social-activity-user.component'
import { WsDiscussionForumService } from '../../ws-discussion-forum.services'
import { NsDiscussionForum } from '../../ws-discussion-forum.model'

@Component({
  selector: 'ws-widget-btn-social-like',
  templateUrl: './btn-social-like.component.html',
  styleUrls: ['./btn-social-like.component.scss'],
})
export class BtnSocialLikeComponent implements OnInit {
  @Input() postId = ''
  @Input() postCreatorId = ''
  @Input() activity: NsDiscussionForum.IPostActivity = {} as NsDiscussionForum.IPostActivity
  isUpdating = false
  userId = ''
  userDataForLike: any[] = []
  constructor(
    private configSvc: ConfigurationsService,
    private socialSvc: WsDiscussionForumService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private discussionSvc: WsDiscussionForumService,
  ) {
    if (this.configSvc.userProfile) {
      this.userId = this.configSvc.userProfile.userId || ''
    }
  }

  ngOnInit() {
    this.getWidsForLike()
  }

  updateLike(invalidUserMsg: string) {
    if (this.postCreatorId === this.userId) {
      this.snackBar.open(invalidUserMsg)
      return
    }
    if (this.isUpdating) {
      return
    }
    this.isUpdating = true
    const request: NsDiscussionForum.IPostActivityUpdateRequest = {
      id: this.postId,
      userId: this.userId,
      activityType: NsDiscussionForum.EActivityType.LIKE,
    }
    this.socialSvc.updateActivity(request).subscribe(_ => {
      this.isUpdating = false
      if (this.activity) {
        if (this.activity.userActivity.like) {
          this.activity.userActivity.like = false
          this.activity.activityData.like -= 1
        } else {
          this.activity.userActivity.like = true
          this.activity.activityData.like += 1
        }
      }
    })
  }

  openLikesDialog() {
    const data: NsDiscussionForum.IDialogActivityUsers = { postId: this.postId, activityType: NsDiscussionForum.EActivityType.LIKE }
    this.dialog.open(DialogSocialActivityUserComponent, {
      data,
    })
  }

  async getWidsForLike() {
    if (this.activity) {
      // filter for Like
      //  if (this.activity.activityDetails) {
      // const wids = this.activity.activityDetails.like
      const wids = ['7b710f74-8f84-427f-bc13-f4220ed2a1c1', 'acbf4053-c126-4e85-a0bf-252a896535ea',
        'b690b9c6-a9de-49dd-94ef-1dffcc7a053c']
      const userDetails = await this.discussionSvc.getUsersByIDs(wids)
      this.userDataForLike = this.discussionSvc.addIndexToData(userDetails)
    }
  }
}
