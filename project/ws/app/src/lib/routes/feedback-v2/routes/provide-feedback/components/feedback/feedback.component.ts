import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { TSendStatus, IResolveResponse, ConfigurationsService } from '@ws-widget/utils'
import {
  FeedbackSnackbarComponent,
  EFeedbackRole,
  EFeedbackType,
  FeedbackService,
  IFeedbackConfig,
  INotificationRequest,
} from '@ws-widget/collection'
import { ActivatedRoute, Router } from '@angular/router'
import { ContentFeedbackService } from '../../service/content-feedback.service'

@Component({
  selector: 'ws-app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  positiveFeedbackSendStatus: TSendStatus
  negativeFeedbackSendStatus: TSendStatus
  singleFeedbackSendStatus: TSendStatus
  feedbackForm: FormGroup
  singleFeedbackForm: FormGroup
  feedbackConfig!: IFeedbackConfig
  allowedToDiscussionForum = true

  constructor(
    private feedbackApi: FeedbackService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private configSvc: ConfigurationsService,
    private feedbackService: ContentFeedbackService,
    private router: Router,
  ) {
    this.positiveFeedbackSendStatus = 'none'
    this.negativeFeedbackSendStatus = 'none'
    this.singleFeedbackSendStatus = 'none'

    this.feedbackForm = new FormGroup({
      positive: new FormControl(null, [Validators.minLength(1), Validators.maxLength(2000)]),
      negative: new FormControl(null, [Validators.minLength(1), Validators.maxLength(2000)]),
    })

    this.singleFeedbackForm = new FormGroup({
      feedback: new FormControl(null, [Validators.minLength(1), Validators.maxLength(2000)]),
    })

    const feedbackConfigResolve = this.route.snapshot.data['feedbackConfig'] as IResolveResponse<
      IFeedbackConfig
    >
    if (feedbackConfigResolve && feedbackConfigResolve.data) {
      this.feedbackConfig = feedbackConfigResolve.data
    }
  }

    ngOnInit() {
      this.route.data.subscribe(_data => {
        // console.log(_data)
        // tslint:disable-next-line: max-line-length
        if (this.feedbackService.isVisibileAccToRoles(_data.pageData.data.rolesAllowed.feedback, _data.pageData.data.rolesNotAllowed.feedback)) {
          this.allowedToDiscussionForum = true
        } else {
          this.router.navigateByUrl('/page/home')
        }
      })
    }
  submitPositiveFeedback(text: string) {
    this.positiveFeedbackSendStatus = 'sending'
    this.feedbackApi
      .submitPlatformFeedback({
        text,
        type: EFeedbackType.Platform,
        sentiment: 'positive',
        role: EFeedbackRole.User,
      })
      .subscribe(
        () => {
          this.positiveFeedbackSendStatus = 'done'
          this.feedbackForm.patchValue({ positive: null })
          this.snackbar.openFromComponent(FeedbackSnackbarComponent, {
            data: { action: 'platform_feedback_submit', code: 'success' },
          })
        },
        () => {
          this.positiveFeedbackSendStatus = 'error'
          this.snackbar.openFromComponent(FeedbackSnackbarComponent, {
            data: { action: 'platform_feedback_submit', code: 'failure' },
          })
        },
      )
  }

  submitNegativeFeedback(text: string) {
    this.negativeFeedbackSendStatus = 'sending'
    this.feedbackApi
      .submitPlatformFeedback({
        text,
        type: EFeedbackType.Platform,
        sentiment: 'negative',
        role: EFeedbackRole.User,
      })
      .subscribe(
        () => {
          this.negativeFeedbackSendStatus = 'done'
          this.feedbackForm.patchValue({ negative: null })
          this.snackbar.openFromComponent(FeedbackSnackbarComponent, {
            data: { action: 'platform_feedback_submit', code: 'success' },
          })
        },
        () => {
          this.negativeFeedbackSendStatus = 'error'
          this.snackbar.openFromComponent(FeedbackSnackbarComponent, {
            data: { action: 'platform_feedback_submit', code: 'failure' },
          })
        },
      )
  }

  submitFeedback() {
    if (this.feedbackForm.controls['positive'].valid && this.feedbackForm.value['positive']) {
      this.submitPositiveFeedback(this.feedbackForm.value['positive'])
    }

    if (this.feedbackForm.controls['negative'].valid && this.feedbackForm.value['negative']) {
      this.submitNegativeFeedback(this.feedbackForm.value['negative'])
    }
  }

  submitSingleFeedback() {
    this.singleFeedbackSendStatus = 'sending'

    this.feedbackApi
      .submitPlatformFeedback({
        text: this.singleFeedbackForm.value['feedback'],
        role: EFeedbackRole.User,
        type: EFeedbackType.Platform,
      })
      .subscribe(
        () => {
          this.singleFeedbackSendStatus = 'done'
          if (this.configSvc.instanceConfig && this.configSvc.instanceConfig.rootOrg === 'RootOrg') {
            const req: INotificationRequest = {
              'event-id': 'platform_feedback',
              'tag-value-pair': {
                '#feedback': this.singleFeedbackForm.value['feedback'],
              },
              recipients: {
                learner: [
                  (this.configSvc.userProfile && this.configSvc.userProfile.userId) || '',
                ],
              },
            }
            this.feedbackApi.contentShareNew(req).subscribe()
          }
          this.singleFeedbackForm.patchValue({ feedback: null })

          this.snackbar.openFromComponent(FeedbackSnackbarComponent, {
            data: { action: 'content_feedback_submit', code: 'success' },
          })
        },
        () => {
          this.singleFeedbackSendStatus = 'error'
          this.snackbar.openFromComponent(FeedbackSnackbarComponent, {
            data: { action: 'content_feedback_submit', code: 'failure' },
          })
        },
      )
  }
}
