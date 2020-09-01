import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { NsContent } from '@ws-widget/collection'
import { ConfigurationsService, EventService } from '@ws-widget/utils'
import { SafeHtml, DomSanitizer } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { SearchServService } from '../../services/search-serv.service'
@Component({
  selector: 'ws-app-learning-card',
  templateUrl: './learning-card.component.html',
  styleUrls: ['./learning-card.component.scss'],
})
export class LearningCardComponent implements OnInit, OnChanges {
  @Input()
  displayType: 'basic' | 'advanced' = 'basic'
  @Input()
  content: NsContent.IContent = {} as NsContent.IContent
  contentProgress = 0
  isExpanded = false
  defaultThumbnail = ''
  description: SafeHtml = ''
  allowedToShare = true
  constructor(
    private events: EventService,
    private configSvc: ConfigurationsService,
    private domSanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private searchService: SearchServService,
  ) { }

  ngOnInit() {
    const instanceConfig = this.configSvc.instanceConfig
    if (instanceConfig) {
      this.defaultThumbnail = instanceConfig.logos.defaultContent
    }
    this.route.data.subscribe(_data => {
  // console.log(_data)
   // tslint:disable-next-line: max-line-length
      if (this.searchService.isVisibileAccToRoles(_data.pageData.data.rolesAllowed.share, _data.pageData.data.rolesNotAllowed.share)) {
        this.allowedToShare = true
      } else {
        this.allowedToShare = false
      }
    })
  }
  ngOnChanges(changes: SimpleChanges) {
    for (const prop in changes) {
      if (prop === 'content' && this.content.description) {
        this.content.description = this.content.description.replace(/<br>/g, '')
        this.description = this.domSanitizer.bypassSecurityTrustHtml(this.content.description)
      }
    }
  }

  raiseTelemetry() {
    this.events.raiseInteractTelemetry(
      'click',
      'cardSearch',
      {
        contentId: this.content.identifier,

      },
    )
  }
}
