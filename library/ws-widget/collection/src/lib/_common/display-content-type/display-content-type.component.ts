import { Component, OnInit, Input } from '@angular/core'
import { NsContent } from '../../_services/widget-content.model'

@Component({
  selector: 'ws-widget-display-content-type',
  templateUrl: './display-content-type.component.html',
  styleUrls: ['./display-content-type.component.scss'],
})
export class DisplayContentTypeComponent implements OnInit {
  @Input() content!: NsContent.IContent
  @Input() displayContentType: NsContent.EDisplayContentTypes | string = NsContent.EDisplayContentTypes.DEFAULT
  displayContentTypeEnum = NsContent.EDisplayContentTypes
  constructor() { }

  ngOnInit() {
    // console.log(this.content)
    if (this.content) {
      if (this.content.contentType === 'Resource') {
        if (this.content.assetType) {
          // console.log(this.content.assetType, this.displayContentType)
          if (this.content.assetType === 'Connection') {
            this.displayContentType = 'Connection'
          }
          // console.log(this.displayContentType)
        }
      }
  }
  }
}
