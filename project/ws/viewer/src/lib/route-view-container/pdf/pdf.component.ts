import { Component, Input, OnInit } from '@angular/core'
import { NsContent, NsDiscussionForum } from '@ws-widget/collection'
import { NsWidgetResolver } from '@ws-widget/resolver'
import { ActivatedRoute } from '@angular/router'
import { ConfigurationsService } from '../../../../../../../library/ws-widget/utils/src/public-api'
import { ViewerDataService } from '../../viewer-data.service'

@Component({
  selector: 'viewer-pdf-container',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss'],
})
export class PdfComponent implements OnInit {
  @Input() isFetchingDataComplete = false
  @Input() pdfData: NsContent.IContent | null = null
  @Input() forPreview = false
  @Input() widgetResolverPdfData: any = {
    widgetType: 'player',
    widgetSubType: 'playerPDF',
    widgetData: {
      pdfUrl: '',
      identifier: '',
      disableTelemetry: false,
      hideControls: true,
    },
  }
  @Input() isPreviewMode = false
  @Input() discussionForumWidget: NsWidgetResolver.IRenderConfigWithTypedData<
    NsDiscussionForum.IDiscussionForumInput
  > | null = null
  isTypeOfCollection = false
  isRestricted = false
  allowedToSharePlaylist = true
  constructor(
    private activatedRoute: ActivatedRoute,
    private configSvc: ConfigurationsService,
    private viewerService: ViewerDataService
) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(_data => {
      console.log(_data)
      // tslint:disable-next-line: max-line-length
      if (this.viewerService.isVisibileAccToRoles(_data.pageData.data.enableDisscussionForum.rolesAllowed.disscussionForum, _data.pageData.data.enableDisscussionForum.rolesNotAllowed.disscussionForum)) {
        this.allowedToSharePlaylist = true
      } else {
        this.allowedToSharePlaylist = false
      }
    })
    if (this.configSvc.restrictedFeatures) {
      this.isRestricted =
        !this.configSvc.restrictedFeatures.has('disscussionForum')
    }
    this.isTypeOfCollection = this.activatedRoute.snapshot.queryParams.collectionType ? true : false
  }
}
