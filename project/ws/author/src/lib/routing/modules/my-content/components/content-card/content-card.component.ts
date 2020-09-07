import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { AccessControlService } from '@ws/author/src/lib/modules/shared/services/access-control.service'

@Component({
  selector: 'ws-auth-root-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss'],
})
export class ContentCardComponent implements OnInit {
  @Input() data: any
  @Input() ordinals: any
  @Input() forExpiry = false
  @Input() forDelete = false
  filteredSubTitles: any[] = []
  translationArray: any = []
  userId!: string
  @Output() action = new EventEmitter<any>()
  isBaseContent: Boolean = true
  constructor(private accessService: AccessControlService) { }

  ngOnInit() {
    // console.log(this.data)
    if (this.data.contentType === 'Resource') {
        if (this.data.assetType) {
          if (this.data.assetType === 'Connection') {
            this.data.contentType = 'Connection'
          }
          // console.log(this.data.assetType, this.data.contentType)
        }
      }
    if (this.data.hasTranslations && this.data.hasTranslations.length) {
      this.translationArray = this.translationArray.concat(this.data.hasTranslations)
    }
    if (this.data.isTranslationOf && this.data.isTranslationOf.length) {
      this.isBaseContent = false
      this.translationArray = this.translationArray.concat(this.data.isTranslationOf)
    }
    this.filteredSubTitles = this.translationArray.length
      ? this.ordinals.subTitles.filter(
        (elem: any) => !this.translationArray.find((item: any) => elem.srclang === item.locale),
      )
      : this.ordinals.subTitles
    this.userId = this.accessService.userId
  }

  getName(lang: string): string {
    const language = this.ordinals.subTitles.find((v: any) => v.srclang === lang)
    return language ? language.label : lang
  }

  showMenuItem(menuType: string) {
    let returnValue = false
    switch (menuType) {
      case 'edit':
        /* if (this.data.status === 'Draft') {
          returnValue = this.accessService.hasAccess(this.data)
          } */
        returnValue = this.accessService.hasAccess(this.data) && this.data.status !== 'Unpublished'

        returnValue = !this.data.authoringDisabled

        returnValue = !this.accessService.hasRole(['publisher'])

        returnValue = this.accessService.hasRole(['editor', 'content-creator'])
        break
      case 'delete': {
        if (
          // tslint:disable-next-line: max-line-length
          (this.data.status === 'Draft' || this.data.status === 'Live' || this.data.status === 'Unpublished' || this.data.status === 'Reviewed') && this.accessService.hasRole(['editor', 'admin', 'content-creator'])
        ) {
          returnValue = this.accessService.hasAccess(this.data)
        }
        break
      }
      case 'moveToDraft':
        if (
          this.data.status === 'Live' || this.data.status === 'Unpublished' ||
          this.data.status === 'InReview' ||
          this.data.status === 'Reviewed' ||
          this.data.status === 'QualityReview'
        ) {
          returnValue = this.accessService.hasAccess({ ...this.data, status: 'Draft' })
        }
        break
      case 'moveToInReview':
        if (this.data.status === 'Reviewed' || this.data.status === 'QualityReview') {
          returnValue = this.accessService.hasAccess({ ...this.data, status: 'InReview' })
        }
        break
      case 'publish':
        if (this.data.status === 'Reviewed' && this.accessService.hasRole(['publisher'])) {
          returnValue = this.accessService.hasAccess(this.data)
        }
        break
      case 'unpublish':
        if (this.data.status === 'Live' && this.accessService.hasRole(['editor', 'admin', 'publisher'])) {
          returnValue = this.accessService.hasAccess(this.data)
        }
        break
      case 'review':
        if (this.data.status === 'InReview' || this.data.status === 'QualityReview') {
          returnValue = this.accessService.hasAccess(this.data)
        }
        break
      case 'lang':
        returnValue = this.accessService.hasAccess({ ...this.data, status: 'Draft' })
        break
    }
    return returnValue
  }

  create(language: string) {
    this.action.emit({
      type: 'create',
      data: { ...this.data, locale: language },
    })
  }

  viewComments() {
    this.action.emit({
      type: 'comments',
    })
  }

  takeAction(actionType: string) {
    this.action.emit({
      type: actionType,
      data: this.data,
    })
  }

  changeToDefaultImg($event: any) {
    $event.target.src = this.accessService.defaultLogo
  }
}
