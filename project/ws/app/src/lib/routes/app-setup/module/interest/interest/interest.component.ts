import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { WidgetContentService, NsContent, BtnPlaylistService, NsPlaylist } from '@ws-widget/collection'
import { TFetchStatus, NsPage, ConfigurationsService } from '../../../../../../../../../../library/ws-widget/utils/src/public-api'
import { FormControl } from '@angular/forms'
import { MatSnackBar } from '@angular/material'
import { Subscription } from 'rxjs'
import { InterestService } from '../../../../profile/routes/interest/services/interest.service'
import { EventService } from '@ws-widget/utils'

// displaying static interest
// export interface IInterest {
//   name: string
// }

@Component({
  selector: 'ws-app-interests',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.scss'],
})
export class InterestComponent implements OnInit {

  constructor(private activateRoute: ActivatedRoute,
              private contentSvc: WidgetContentService,
              private playlistSvc: BtnPlaylistService,
              private configSvc: ConfigurationsService,
              private router: Router,
              private interestSvc: InterestService,
              private snackBar: MatSnackBar,
              private events: EventService,
  ) { }
  @ViewChild('toastSuccess', { static: true }) toastSuccess!: ElementRef<any>
  @ViewChild('toastDuplicate', { static: true }) toastDuplicate!: ElementRef<
    any
  >
  @ViewChild('toastFailure', { static: true }) toastFailure!: ElementRef<any>

  interestsData: any
  selectedContent = 0
  selectedInterest = ''
  playListName = 'Learn Later'
  contentLangForm: FormControl = new FormControl()
  interestRES: any
  fetchStatus: TFetchStatus = 'none'
  playlistForInterest: NsPlaylist.IPlaylist | null = null
  interestContent: NsContent.IContent[] = []
  addedInterest = new Set<string>()
  interestToAddMultiple: string[] = []
  pageNavbar: Partial<NsPage.INavBackground> = this.configSvc.pageNavBar
  alreadyAddedInterest = new Set<string>()

  suggestedInterests: string[] = []
  userInterests: string[] = []
  @ViewChild('createPlaylistSuccess', { static: true }) createPlaylistSuccessMessage!: ElementRef<any>
  @ViewChild('createPlaylistError', { static: true }) createPlaylistErrorMessage!: ElementRef<any>
  playlistsSubscription: Subscription | null = null

  ngOnInit() {
    this.fetchSuggestedInterests()

    this.playlistsSubscription = this.playlistSvc
      .getAllPlaylists()
      .subscribe(
        _playlists => {
          _playlists.forEach(element => {
            if (element.name === this.playListName) {
              this.playlistForInterest = element
              this.playlistForInterest.contents.forEach(ele => {
                this.addedInterest.add(ele.identifier)
                this.alreadyAddedInterest.add(ele.identifier)
              })
              return
            }
          })
        })

    this.activateRoute.data.subscribe(data => {
      this.interestRES = data.pageData.data
      this.interestsData = Object.keys(this.interestRES)
    })

    this.selectInterest()
  }

  selectInterest(index: number = 0) {
    if (this.fetchStatus === 'fetching') {
      return
    }
    this.fetchStatus = 'fetching'
    this.selectedContent = index
    this.contentSvc.fetchMultipleContent(this.interestRES[this.interestsData[this.selectedContent]]).subscribe(
      data => {
        this.interestContent = data
        this.fetchStatus = 'done'
      },
      _ => {
        this.fetchStatus = 'error'
      }
    )
    this.selectedInterest = this.interestsData[this.selectedContent]
  }

  interestAdd(identifier: string, checked: boolean) {
    if (checked) {
      this.addedInterest.add(identifier)
    } else {
      this.addedInterest.delete(identifier)
    }
  }
  isInterestAdded(interest: string) {
    return this.interestRES[interest].some((r: string) => Array.from(this.addedInterest).includes(r))
  }

  // addInterest() {
  //   if (this.addedInterest.size || this.addedInterest.size === 0 && this.alreadyAddedInterest.size) {
  //     if (this.playlistForInterest) {
  //       const interestToRemove = Array.from(this.alreadyAddedInterest).filter(el => !Array.from(this.addedInterest).includes(el))
  //       const interestToAdd = Array.from(this.addedInterest).filter(el => !Array.from(this.alreadyAddedInterest).includes(el))
  //       this.interestsData.forEach((interest: string) => {
  //         if (this.interestRES[interest].some((r: any) => Array.from(this.addedInterest).includes(r))) {
  //           this.interestToAddMultiple.push(interest)
  //         }
  //       })
  //       this.interestSvc.addUserMultipleInterest(this.interestToAddMultiple).subscribe()
  //       if (interestToRemove.length) {
  //         this.playlistSvc.deletePlaylistContent(this.playlistForInterest, interestToRemove).subscribe()
  //       }
  //       this.playlistSvc.addPlaylistContent(this.playlistForInterest, interestToAdd).subscribe(
  //         () => {
  //           this.snackbar.open(this.createPlaylistSuccessMessage.nativeElement.value)
  //           this.router.navigate(['/app/setup/home/done'])
  //         },
  //         () => {
  //           this.snackbar.open(this.createPlaylistErrorMessage.nativeElement.value)
  //           this.router.navigate(['/app/setup/home/done'])
  //         },
  //       )
  //     } else {
  //       this.playlistSvc.upsertPlaylist({
  //         playlist_title: this.playListName,
  //         content_ids: Array.from(this.addedInterest),
  //         visibility: NsPlaylist.EPlaylistVisibilityTypes.PRIVATE,
  //       }).subscribe(
  //         () => {
  //           this.snackbar.open(this.createPlaylistSuccessMessage.nativeElement.value)
  //           this.router.navigate(['/app/setup/home/done'])
  //         },
  //         () => {
  //           this.snackbar.open(this.createPlaylistErrorMessage.nativeElement.value)
  //           this.router.navigate(['/app/setup/home/done'])
  //         },
  //       )
  //     }

  //   } else {
  //     this.router.navigate(['/app/setup/home/done'])
  //   }
  // }

  private fetchSuggestedInterests() {
    this.interestSvc.fetchSuggestedInterestV2().subscribe(data => {
      // //console.log('Interest: ', data)
      this.suggestedInterests = data

      // this.removeAlreadyAddedFromRecommended()
    })
  }

  addInterest(interest: string, fromSuggestions = false, recommendIndex = -1) {
    const tempInterest = interest.trim()
    if (!tempInterest.length) {
      return
    }
    const duplicate = this.userInterests.filter(
      userTopic => userTopic.toLowerCase() === tempInterest.toLowerCase(),
    )
    if (duplicate.length) {
      this.openSnackBar(this.toastDuplicate.nativeElement.value)
      return
    }
    if (fromSuggestions) {
      this.suggestedInterests = this.suggestedInterests.filter(
        suggestedInterest => suggestedInterest !== tempInterest,
      )
    }
    this.userInterests.splice(0, 0, tempInterest)
    this.raiseTelemetry('add', tempInterest)
    this.interestSvc.addUserInterest(tempInterest).subscribe(
      _response => {
        this.openSnackBar(this.toastSuccess.nativeElement.value)
      },
      _err => {
        this.userInterests = this.userInterests.filter(
          unitInterest => unitInterest !== interest,
        )
        if (fromSuggestions && recommendIndex > -1) {
          this.suggestedInterests.splice(recommendIndex, 0, interest)
        }
        this.openSnackBar(this.toastFailure.nativeElement.value)
      },
    )
  }

  private openSnackBar(primaryMsg: string, duration: number = 4000) {
    this.snackBar.open(primaryMsg, undefined, {
      duration,
    })
  }

  raiseTelemetry(action: 'add' | 'remove', interest: string) {
    this.events.raiseInteractTelemetry('interest', action, { interest })
  }

  // add(event: MatChipInputEvent): void {
  //   const input = event.input
  //   const value = event.value

  //   // Add our fruit
  //   if ((value || '').trim()) {
  //     this.userinterests.push({ name: value.trim() })
  //   }

  //   // Reset the input value
  //   if (input) {
  //     input.value = ''
  //   }
  // }

  // remove(userInterest: IInterest): void {
  //   const index = this.userinterests.indexOf(userInterest)

  //   if (index >= 0) {
  //     this.userinterests.splice(index, 1)

  //   }
  // }

  gotoHomePage() {

    this.router.navigate(['/page/home'])
  }

}
