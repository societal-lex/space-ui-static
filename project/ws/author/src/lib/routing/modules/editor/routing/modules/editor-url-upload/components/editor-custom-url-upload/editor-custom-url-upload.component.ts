import { Component, Input, OnInit, OnChanges } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material'
import { MatDialog } from '@angular/material/dialog'
import { ConfigurationsService } from '@ws-widget/utils'
import { NOTIFICATION_TIME } from '@ws/author/src/lib/constants/constant'
import { Notify } from '@ws/author/src/lib/constants/notificationMessage'
import { NSContent } from '@ws/author/src/lib/interface/content'
import { IprDialogComponent } from '@ws/author/src/lib/modules/shared/components/ipr-dialog/ipr-dialog.component'
import { NotificationComponent } from '@ws/author/src/lib/modules/shared/components/notification/notification.component'
import { EditorContentService } from '@ws/author/src/lib/routing/modules/editor/services/editor-content.service'
import { IFormMeta } from './../../../../../../../../interface/form'
import { AuthInitService } from './../../../../../../../../services/init.service'
import { URLCheckerClass } from './../../../curate/components/url-upload/url-upload.helper'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ws-author-editor-custom-url-upload',
  templateUrl: './editor-custom-url-upload.component.html',
  styleUrls: ['./editor-custom-url-upload.component.scss'],
})
export class EditorCustomUrlUploadComponent implements OnInit, OnChanges {
  urlUploadForm!: FormGroup
  iprAccepted = false
  currentContent = ''
  canUpdate = true
  showOpensInNewTab = false
  showIntranetOptions = false
  @Input() isCollectionEditor = false
  @Input() isSubmitPressed = false
  @Input() showIPRDeclaration = false
  @Input() clearArtifactForm = false

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private contentService: EditorContentService,
    private configSvc: ConfigurationsService,
    private initService: AuthInitService,
  ) {}

  ngOnChanges() {
    if (this.clearArtifactForm && this.urlUploadForm && this.urlUploadForm.controls) {
      this.urlUploadForm.controls.isIframeSupported.setValue('No')
      this.urlUploadForm.controls.mimeType.setValue('')
      this.urlUploadForm.controls.isExternal.setValue(false)
      this.urlUploadForm.controls.isInIntranet.setValue(false)
      this.urlUploadForm.controls.artifactLinkUrl.setValue('')
      this.storeData()
    }
  }

  ngOnInit() {
    this.currentContent = this.contentService.currentContent
    this.contentService.changeActiveCont.subscribe(data => {
      this.currentContent = data
      this.triggerDataChange()
    })
  }

  checkCondition(meta: string, type: 'show' | 'required' | 'disabled'): boolean {
    return this.contentService.checkCondition(this.currentContent, meta, type)
  }

  triggerDataChange() {
    const updatedMeta = this.contentService.getUpdatedMeta(this.currentContent)
    if (
      !this.isCollectionEditor ||
      (this.isCollectionEditor && updatedMeta.category === 'Resource')
    ) {
      this.assignData(updatedMeta)
    }
  }

  createForm() {
    this.urlUploadForm = this.formBuilder.group({
      isIframeSupported: ['', Validators.required],
      mimeType: [],
      isInIntranet: ['', Validators.required],
      isExternal: [],
      artifactLinkUrl: [''],
    })
    this.urlUploadForm.valueChanges.subscribe(() => {
      if (this.canUpdate) {
        this.storeData()
      }
    })
    this.urlUploadForm.controls.artifactLinkUrl.valueChanges.pipe(
      debounceTime(800),
      distinctUntilChanged(),
      ).subscribe(() => {
      if (this.canUpdate) {
        this.iprAccepted = !this.showIPRDeclaration
        this.check()
        this.submit()
      }
    })
  }

  assignData(meta: NSContent.IContentMeta) {
    if (!this.urlUploadForm) {
      this.createForm()
    }
    this.canUpdate = false
    this.urlUploadForm.controls.artifactLinkUrl.setValue(meta.artifactLinkUrl || '')
    this.urlUploadForm.controls.mimeType.setValue(meta.mimeType || 'application/html')
    this.urlUploadForm.controls.isIframeSupported.setValue(meta.isIframeSupported || 'No')
    this.urlUploadForm.controls.isInIntranet.setValue(meta.isInIntranet || false)
    this.urlUploadForm.controls.isExternal.setValue(true)
    this.canUpdate = true
    if (meta.artifactLinkUrl &&  this.showIPRDeclaration) {
      this.iprAccepted = true
    }
    if (meta.artifactLinkUrl) {
      this.check()
    } else {
      this.storeData()
    }
    this.urlUploadForm.markAsPristine()
    this.urlUploadForm.markAsUntouched()
  }

  showIpr() {
    const dialogRef = this.dialog.open(IprDialogComponent, {
      width: '70%',
      data: { iprAccept: this.iprAccepted },
    })
    dialogRef.afterClosed().subscribe(result => {
      this.iprAccepted = result
    })
  }

  iprChecked() {
    this.iprAccepted = !this.iprAccepted
  }

  submit(event?: Event) {
    if (event) {
      // console.log('captured event')
      event.preventDefault()
    }
    if (this.urlUploadForm.controls.artifactLinkUrl.value &&  this.showIPRDeclaration && !this.iprAccepted) {
      this.snackBar.openFromComponent(NotificationComponent, {
        data: {
          type: Notify.IPR_DECLARATION,
        },
        duration: NOTIFICATION_TIME * 1000,
      })
    } else {
      if (this.urlUploadForm.controls.artifactLinkUrl.valid) {
        this.storeData()
        // console.log('data saved ', this.contentService.getUpdatedMeta(this.currentContent).artifactLinkUrl)
        // this.data.emit('next')
      } else if (this.urlUploadForm.controls.artifactLinkUrl.touched) {
        this.snackBar.openFromComponent(NotificationComponent, {
          data: {
            type: Notify.URL_UPLOAD_LINK_FAIL,
          },
          duration: NOTIFICATION_TIME * 1000,
        })
      }
    }
  }

  storeData() {
    const originalMeta = this.contentService.getOriginalMeta(this.currentContent)
    const currentMeta = this.urlUploadForm.value
    const meta: any = {}
    if ((currentMeta.artifactLinkUrl) && !this.iprAccepted) {
      return
    }
    Object.keys(currentMeta).map(v => {
      if (
        JSON.stringify(currentMeta[v as keyof NSContent.IContentMeta]) !==
        JSON.stringify(originalMeta[v as keyof NSContent.IContentMeta])
      ) {
        if (
          currentMeta[v] ||
          (this.initService.authConfig[v as keyof IFormMeta].type === 'boolean' &&
            meta[v] === false)
        ) {
          meta[v] = currentMeta[v]
        } else {
          meta[v] = JSON.parse(
            JSON.stringify(
              this.initService.authConfig[v as keyof IFormMeta].defaultValue[
                originalMeta.contentType
                // tslint:disable-next-line: ter-computed-property-spacing
              ][0].value,
            ),
          )
        }
      }
    })
    if (meta.mimeType === 'application/html' && this.urlUploadForm.controls.artifactLinkUrl.value) {
      meta.artifactUrl = this.urlUploadForm.controls.artifactLinkUrl.value
    }
    this.contentService.setUpdatedMeta(meta, this.currentContent)
  }

  check() {
    let disableIframe = false
    const artifactLinkUrl = this.urlUploadForm.controls.artifactLinkUrl.value
    this.canUpdate = false
    if (
      this.configSvc.instanceConfig &&
      this.configSvc.instanceConfig.authoring &&
      this.configSvc.instanceConfig.authoring.urlPatternMatching
    ) {
      this.configSvc.instanceConfig.authoring.urlPatternMatching.map(v => {
        if (artifactLinkUrl.match(v.pattern)) {
          if (v.allowIframe) {
            this.urlUploadForm.controls.isIframeSupported.setValue('Yes')
          } else {
            this.urlUploadForm.controls.isIframeSupported.setValue('No')
            this.urlUploadForm.controls.mimeType.setValue('application/html')
            disableIframe = true
          }
          if (v.allowReplace) {
            switch (v.source) {
              case 'youtube':
                this.urlUploadForm.controls.artifactLinkUrl.setValue(
                  URLCheckerClass.youTubeUrlChange(artifactLinkUrl),
                )
                this.urlUploadForm.controls.mimeType.setValue('video/x-youtube')
                break
            }
          }
        } else {
          this.urlUploadForm.controls.mimeType.setValue('application/html')
        }
      })
    }
    this.canUpdate = true
    this.storeData()
    const iframe = this.urlUploadForm.controls.isIframeSupported
    if (disableIframe) {
      iframe.disable()
    } else {
      iframe.enable()
    }
  }

  showError(formControl: AbstractControl) {
    if (formControl.invalid) {
      if (this.isSubmitPressed) {
        return true
      }
      if (formControl && formControl.touched) {
        return true
      }
      return false
    }
    return false
  }
}
