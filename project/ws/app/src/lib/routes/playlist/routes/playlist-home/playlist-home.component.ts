import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { BtnPlaylistService, NsError, NsPlaylist, ROOT_WIDGET_CONFIG } from '@ws-widget/collection'
import { NsWidgetResolver } from '@ws-widget/resolver'
import { ConfigurationsService, NsPage } from '@ws-widget/utils'
import { Subscription } from 'rxjs'
import { PlaylistService } from '../../service/playlist.service'

@Component({
  selector: 'ws-app-playlist-home',
  templateUrl: './playlist-home.component.html',
  styleUrls: ['./playlist-home.component.scss'],
})

export class PlaylistHomeComponent implements OnInit, OnDestroy {

  EPlaylistTypes = NsPlaylist.EPlaylistTypes
  playlists: NsPlaylist.IPlaylist[] = this.route.snapshot.data.playlists.data
  type: NsPlaylist.EPlaylistTypes = this.route.snapshot.data.type
  error = this.route.snapshot.data.playlists.error

  numNotifications = 0

  playlistsSubscription: Subscription | null = null
  notificationsSubscription: Subscription | null = null

  searchPlaylistQuery = ''
  isShareEnabled = false
  allowedToSharePlaylist = true

  pageNavbar: Partial<NsPage.INavBackground> = this.configSvc.pageNavBar
  errorWidget: NsWidgetResolver.IRenderConfigWithTypedData<NsError.IWidgetErrorResolver> = {
    widgetType: ROOT_WIDGET_CONFIG.errorResolver._type,
    widgetSubType: ROOT_WIDGET_CONFIG.errorResolver.errorResolver,
    widgetData: {
      errorType: 'internalServer',
    },
  }

  constructor(
    private route: ActivatedRoute,
    private playlistSvc: BtnPlaylistService,
    private configSvc: ConfigurationsService,
    public playlistService: PlaylistService,

  ) { }

  ngOnInit() {
    this.route.data.subscribe(_data => {
      // console.log(_data)
      // tslint:disable-next-line: max-line-length
      if (this.playlistService.isVisibileAccToRoles(_data.pageData.data.rolesAllowed.playList, _data.pageData.data.rolesNotAllowed.playList)) {
        this.allowedToSharePlaylist = true
      } else {
        this.allowedToSharePlaylist = false
      }
    })
    if (this.configSvc.restrictedFeatures) {
      this.isShareEnabled = !this.configSvc.restrictedFeatures.has('share')
    }
    this.playlistsSubscription = this.playlistSvc
      .getPlaylists(this.type)
      .subscribe(
        playlists => {
          this.playlists = playlists
        })
    this.notificationsSubscription = this.playlistSvc
      .getPlaylists(NsPlaylist.EPlaylistTypes.PENDING)
      .subscribe(pending => this.numNotifications = pending.length)
  }

  // ngAfterViewInit() {
  //   this.configSvc.tourGuideNotifier.next(true)
  //   this.tour.data = [[
  //     '#playlist',
  //     '',
  //     'If you prefer, you can turn off this guide',
  //   ],
  //   [
  //     '#search',
  //     'Channel',
  //     'If you prefer, you can turn off this guide',
  //   ],
  //   [
  //     '#myPlaylist',
  //     'Learning',
  //     'If you prefer, you can turn off this guide',
  //   ],
  //   [
  //     '#sharedPlaylist',
  //     'Banners',
  //     'If you prefer, you can turn off this guide',
  //   ],
  //   [
  //     '#createPlaylist',
  //     'Banners',
  //     'If you prefer, you can turn off this guide',
  //   ],
  //   ]
  // }

  ngOnDestroy() {
    if (this.playlistsSubscription) {
      this.playlistsSubscription.unsubscribe()
    }
    if (this.notificationsSubscription) {
      this.notificationsSubscription.unsubscribe()
    }
  }
}
