import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
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
import { URLCheckerClass } from './url-upload.helper'

@Component({
  selector: 'ws-auth-url-upload',
  templateUrl: './url-upload.component.html',
  styleUrls: ['./url-upload.component.scss'],
})
export class UrlUploadComponent implements OnInit {
  urlUploadForm!: FormGroup
  iprAccepted = false
  currentContent = ''
  canUpdate = true
  showOpensInNewTab = false
  showIntranetOptions = false
  @Input() isCollectionEditor = false
  @Input() isSubmitPressed = false
  @Output() data = new EventEmitter<string>()
  @Input() showIPRDeclaration = false

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private contentService: EditorContentService,
    private configSvc: ConfigurationsService,
    private initService: AuthInitService,
  ) {}

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
      artifactUrl: [''],
      isIframeSupported: ['', Validators.required],
      mimeType: [],
      isInIntranet: ['', Validators.required],
      isExternal: [],
    })
    this.urlUploadForm.valueChanges.subscribe(() => {
      if (this.canUpdate) {
        this.storeData()
      }
    })
    this.urlUploadForm.controls.artifactUrl.valueChanges.subscribe(() => {
      if (this.canUpdate) {
        this.iprAccepted = !this.showIPRDeclaration
        this.check()
      }
    })
  }

  assignData(meta: NSContent.IContentMeta) {
    if (!this.urlUploadForm) {
      this.createForm()
    }
    this.canUpdate = false
    this.urlUploadForm.controls.artifactUrl.setValue(meta.artifactUrl || '')
    this.urlUploadForm.controls.mimeType.setValue(meta.mimeType || 'application/html')
    this.urlUploadForm.controls.isIframeSupported.setValue(meta.isIframeSupported || 'No')
    this.urlUploadForm.controls.isInIntranet.setValue(meta.isInIntranet || false)
    this.urlUploadForm.controls.isExternal.setValue(true)
    this.canUpdate = true
    if (meta.artifactUrl &&  this.showIPRDeclaration) {
      this.iprAccepted = true
    }
    if (meta.artifactUrl) {
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
    if (this.urlUploadForm.controls.artifactUrl.value &&  this.showIPRDeclaration && !this.iprAccepted) {
      this.snackBar.openFromComponent(NotificationComponent, {
        data: {
          type: Notify.IPR_DECLARATION,
        },
        duration: NOTIFICATION_TIME * 1000,
      })
    } else {
      if (this.urlUploadForm.controls.artifactUrl.valid) {
        this.storeData()
        this.data.emit('next')
      } else {
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
    if (currentMeta.artifactUrl && !this.iprAccepted) {
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
    this.contentService.setUpdatedMeta(meta, this.currentContent)
  }

  check() {
    let disableIframe = false
    const artifactUrl = this.urlUploadForm.controls.artifactUrl.value
    this.canUpdate = false
    if (
      this.configSvc.instanceConfig &&
      this.configSvc.instanceConfig.authoring &&
      this.configSvc.instanceConfig.authoring.urlPatternMatching
    ) {
      this.configSvc.instanceConfig.authoring.urlPatternMatching.map(v => {
        if (artifactUrl.match(v.pattern)) {
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
                this.urlUploadForm.controls.artifactUrl.setValue(
                  URLCheckerClass.youTubeUrlChange(artifactUrl),
                )
                this.urlUploadForm.controls.mimeType.setValue('video/x-youtube')
                break
            }
          }
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
