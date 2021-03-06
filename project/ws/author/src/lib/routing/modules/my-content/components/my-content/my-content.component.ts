import { AuthExpiryDateConfirmComponent } from '@ws/author/src/lib/modules/shared/components/auth-expiry-date-confirm/auth-expiry-date-confirm.component'
import { FlatTreeControl } from '@angular/cdk/tree'
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { MatDialog, MatSnackBar, MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'
import { NOTIFICATION_TIME } from '@ws/author/src/lib/constants/constant'
import { Notify } from '@ws/author/src/lib/constants/notificationMessage'
import { NSApiRequest } from '@ws/author/src/lib/interface/apiRequest'
import {
  IAuthoringPagination,
  IFilterMenuNode,
  IMenuFlatNode,
} from '@ws/author/src/lib/interface/authored'
import { NSContent } from '@ws/author/src/lib/interface/content'
import { CommentsDialogComponent } from '@ws/author/src/lib/modules/shared/components/comments-dialog/comments-dialog.component'
import { ConfirmDialogComponent } from '@ws/author/src/lib/modules/shared/components/confirm-dialog/confirm-dialog.component'
import { ErrorParserComponent } from '@ws/author/src/lib/modules/shared/components/error-parser/error-parser.component'
import { NotificationComponent } from '@ws/author/src/lib/modules/shared/components/notification/notification.component'
import { AccessControlService } from '@ws/author/src/lib/modules/shared/services/access-control.service'
import { AuthInitService } from '@ws/author/src/lib/services/init.service'
import { LoaderService } from '@ws/author/src/lib/services/loader.service'
import { Subscription } from 'rxjs'
import { MyContentService } from '../../services/my-content.service'
import { map } from 'rxjs/operators'
import { NotificationService } from '@ws/author/src/lib/services/notification.service'

@Component({
  selector: 'ws-auth-my-content',
  templateUrl: './my-content.component.html',
  styleUrls: ['./my-content.component.scss'],
})
export class MyContentComponent implements OnInit, OnDestroy {
  public sideNavBarOpened = false
  newDesign = false
  filterMenuTreeControl: FlatTreeControl<IMenuFlatNode>
  filterMenuTreeFlattener: any
  public cardContent!: any[]
  public filters: any[] = []
  public status = 'draft'
  public fetchError = false
  contentType: string[] = []
  complexityLevel: string[] = []
  unit: string[] = []
  finalFilters: any = []
  allLanguages: any[] = []
  searchLanguage = ''
  public pagination!: IAuthoringPagination
  userId!: string
  totalContent!: number
  showLoadMore!: boolean
  routerSubscription = <Subscription>{}
  queryFilter = ''
  ordinals: any
  isAdmin = false
  keyValue: any
  apiCallingCount = 0
  sameContentTypeAPI: any
  variousContentTypeAPI: any
  checked = false
  count = false
  selectedFilterItem: any
  removeFilterItem: any
  currentAction: 'author' | 'reviewer' | 'expiry' | 'deleted' = 'author'
  @ViewChild('searchInput', { static: false }) searchInputElem: ElementRef<any> = {} as ElementRef<
    any
  >

  public filterMenuItems: any = []
  key: any

  dataSource: any
  hasChild = (_: number, node: IMenuFlatNode) => node.expandable

  private _transformer = (node: IFilterMenuNode, level: number) => {
    return {
      expandable: !!node.content && node.content.length > 0,
      displayName: node.displayName,
      checked: node.checked,
      type: node.type,
      count: node.count,
      levels: level,
    }
  }

  constructor(
    private myContSvc: MyContentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loadService: LoaderService,
    private accessService: AccessControlService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private authInitService: AuthInitService,
    private readonly notificationSrvc: NotificationService,
  ) {
    this.filterMenuTreeControl = new FlatTreeControl<IMenuFlatNode>(
      node => node.levels,
      node => node.expandable,
    )
    this.filterMenuTreeFlattener = new MatTreeFlattener(
      this._transformer,
      node => node.levels,
      node => node.expandable,
      node => node.content,
    )
    this.dataSource = new MatTreeFlatDataSource(
      this.filterMenuTreeControl,
      this.filterMenuTreeFlattener,
    )
    this.dataSource.data = this.filterMenuItems
    this.userId = this.accessService.userId
    this.isAdmin = this.accessService.hasRole(['admin', 'super-admin', 'content-admin', 'editor'])
  }

  ngOnDestroy() {
    if (this.routerSubscription.unsubscribe) {
      this.routerSubscription.unsubscribe()
    }
    this.loadService.changeLoad.next(false)
  }

  ngOnInit() {
    this.pagination = {
      offset: 0,
      limit: 24,
    }
    this.newDesign = this.accessService.authoringConfig.newDesign
    this.ordinals = this.authInitService.ordinals
    this.allLanguages = this.authInitService.ordinals.subTitles || []
    this.activatedRoute.queryParams.subscribe(params => {
      this.status = params.status
      this.setAction()
      this.fetchContent(false)
    })
  }

  fetchStatus() {
    switch (this.status) {
      case 'draft':
      case 'rejected':
        return ['Draft']
      case 'inreview':
        return ['InReview', 'Reviewed', 'QualityReview']
      case 'review':
        return ['InReview']
      case 'published':
      case 'expiry':
        return ['Live']
      case 'publish':
        return ['Reviewed']
      case 'processing':
        return ['Processing']
      case 'unpublished':
        return ['Unpublished']
      case 'deleted':
        return ['Deleted']
    }
    return ['Draft']
  }

  setAction() {
    switch (this.status) {
      case 'draft':
      case 'rejected':
      case 'inreview':
      case 'review':
      case 'published':
      case 'publish':
      case 'processing':
      case 'unpublished':
      case 'deleted':
        this.currentAction = 'author'
        break
      case 'expiry':
        this.currentAction = 'expiry'
        break
    }
  }

  fetchContent(loadMoreFlag: boolean, changeFilter = true) {
    // this.apiCallingCount += this.apiCallingCount
    const searchV6Data = this.myContSvc.getSearchBody(
      this.status,
      this.searchLanguage ? [this.searchLanguage] : [],
      loadMoreFlag ? this.pagination.offset : 0,
      this.queryFilter,
      this.isAdmin,
    )
    const requestData = {
      request: {
        locale: this.searchLanguage ? [this.searchLanguage] : [],
        query: this.queryFilter,
        filters: {
          status: this.fetchStatus(),
          creatorContacts: <string[]>[],
          trackContacts: <string[]>[],
          publisherDetails: <string[]>[],
          isMetaEditingDisabled: [false],
          isContentEditingDisabled: [false],
        },
        visibleFilters: {
          duration: { displayName: 'Duration' },
          contentType: { displayName: 'Content Type' },
          assetType: { displayName: 'Type' },
          theme: { displayName: 'SDGs' },
          sourceShortName: { displayName: 'Created By' },
          region: { displayName: 'Region' },
        },
        pageNo: loadMoreFlag ? this.pagination.offset : 0,
        sort: [{ lastUpdatedOn: 'desc' }],
        pageSize: this.pagination.limit,
        uuid: this.userId,
        rootOrg: this.accessService.rootOrg,
      },
    }
    if (this.finalFilters.length) {
      this.finalFilters.forEach((v: any) => {
        searchV6Data.filters.forEach((filter: any) => {
          if (filter.andFilters[0].hasOwnProperty(v.key)) {
            // filter.andFilters[0] = {
            //   ...filter.andFilters[0],
            // }
            filter.andFilters[0][v.key].push(...v.value)
          } else {
            filter.andFilters[0] = {
              ...filter.andFilters[0],
              [v.key]: v.value,
            }
          }

        })
        // if (this.apiCallingCount === 2) {
        //   this.sameContentTypeAPI = { ...requestData.request.filters, [v.key]: v.value }
        // }
        // if (this.apiCallingCount > 2) {
        //   if (checked) {
        //     if (this.sameContentTypeAPI.hasOwnProperty(v.key)) {
        //       requestData.request.filters = { ...this.sameContentTypeAPI }
        //     } else {
        //       this.variousContentTypeAPI = { ...this.sameContentTypeAPI, [v.key]: v.value }
        //       requestData.request.filters = { ...this.variousContentTypeAPI }
        //     }
        //   } else {
        //     requestData.request.filters = { ...this.sameContentTypeAPI, [v.key]: v.value }
        //   }
        // } else {
        //   requestData.request.filters = { ...requestData.request.filters, [v.key]: v.value }
        // }
        requestData.request.filters = { ...requestData.request.filters, [v.key]: v.value }
      })
      // console.log(requestData.request.filters)
    }
    if (this.queryFilter) {
      delete requestData.request.sort
    }
    if (
      [
        'draft',
        'rejected',
        'inreview',
        'published',
        'unpublished',
        'processing',
        'deleted',
      ].indexOf(this.status) > -1 &&
      !this.isAdmin
    ) {
      requestData.request.filters.creatorContacts.push(this.userId)
    }
    if (this.status === 'review' && !this.isAdmin) {
      requestData.request.filters.trackContacts.push(this.userId)
    }
    if (this.status === 'publish' && !this.isAdmin) {
      requestData.request.filters.publisherDetails.push(this.userId)
    }

    this.loadService.changeLoad.next(true)
    const observable =
      this.status === 'expiry' || this.newDesign
        ? this.myContSvc.fetchFromSearchV6(searchV6Data, this.isAdmin).pipe(
          map((v: any) => {
            return {
              result: {
                response: v,
              },
            }
          }),
        )
        : this.myContSvc.fetchContent(requestData)
    this.loadService.changeLoad.next(true)
    observable.subscribe(
      data => {
        this.loadService.changeLoad.next(false)
        // console.log(changeFilter)
        if (changeFilter) {
          this.filterMenuItems =
            data && data.result && data.result.response && data.result.response.filters
              ? data.result.response.filters
              : this.filterMenuItems
          this.dataSource.data = this.filterMenuItems
          // console.log(this.dataSource.data, this.filterMenuItems)
        }
        this.cardContent =
          loadMoreFlag && !this.queryFilter
            ? (this.cardContent || []).concat(
              data && data.result && data.result.response ? data.result.response.result : [],
            )
            : data && data.result.response
              ? data.result.response.result
              : []
        this.totalContent = data && data.result.response ? data.result.response.totalHits : 0
        this.showLoadMore =
          this.pagination.offset * this.pagination.limit + this.pagination.limit < this.totalContent
            ? true
            : false
        this.fetchError = false
      },
      () => {
        this.fetchError = true
        this.cardContent = []
        this.showLoadMore = false
        this.loadService.changeLoad.next(false)
      },
    )
  }

  search() {
    if (this.searchInputElem.nativeElement) {
      this.queryFilter = this.searchInputElem.nativeElement.value.trim()
    }
    this.fetchContent(false, false)
  }

  filterApplyEvent(node: any) {
    // if (event) {
    //   this.checked = event.checked
    // }
    // console.log(event)
    this.pagination.offset = 0
    this.sideNavBarOpened = false
    const filterIndex = this.filters.findIndex(v => v.displayName === node.displayName)
    const filterMenuItemsIndex = this.filterMenuItems.findIndex((obj: any) =>
      obj.content.some((val: any) =>
        val.type === node.type),
    )
    const ind = this.finalFilters.indexOf(this.filterMenuItems[filterMenuItemsIndex].type)
    if (filterIndex === -1 && node.checked) {
      this.filters.push(node)
      this.filterMenuItems[filterMenuItemsIndex].content.find(
        (v: any) => v.displayName === node.displayName,
      ).checked = true

      if (ind === -1) {
        this.assignValuesToFinalFilter(filterMenuItemsIndex, node)
      } else {
        this.finalFilters[ind].value.push(node.type)
      }
    } else {
      this.filterMenuItems[filterMenuItemsIndex].content.find(
        (v: any) => v.displayName === node.displayName,
      ).checked = false
      this.filters.splice(filterIndex, 1)
      this.finalFilters.forEach((value: any, index: any) => {
        if (value.key === 'duration') {
          this.selectedFilterItem = node.type
        } else {
          this.selectedFilterItem = node.displayName
        }
        if (value.value.length > 0) {
          value.value.forEach((removeItem: any) => {
            this.removeFilterItem = removeItem
            if (this.removeFilterItem === 'Collection') { this.removeFilterItem = 'Module' }
            if (this.removeFilterItem === this.selectedFilterItem) {
              const indexOfFilterRemoveItem = this.finalFilters[index].value.indexOf(node.displayName)
              const removeFilterValue = this.finalFilters[index].value
              removeFilterValue.splice(indexOfFilterRemoveItem, 1)
            }
          })
        }
      })
    }
    this.dataSource.data = this.filterMenuItems
    this.fetchContent(false, false)
  }

  assignValuesToFinalFilter(filterMenuItemsIndex: any, node: any) {
    this.count = false
    if (this.finalFilters.length > 0) {
      this.finalFilters.forEach((val: any, index: any) => {
        this.keyValue = val
        if (this.finalFilters[index].key === this.filterMenuItems[filterMenuItemsIndex].type && node.hasOwnProperty('type')) {
          this.count = true
          this.finalFilters[index].value.push(node.type)
        }
      })
          if (this.count === false) {
            this.finalFilters.push({
              key: this.filterMenuItems[filterMenuItemsIndex].type,
              value: [node.type],
            })
          }
        }

    if (this.finalFilters.length === 0) {
      if (this.finalFilters.includes('key')) {
        this.finalFilters.forEach((val: any) => {
          if (val.key === this.filterMenuItems[filterMenuItemsIndex].type) {
            this.finalFilters[0].value.push(node.type)
          } else {
            this.finalFilters.push({
              key: this.filterMenuItems[filterMenuItemsIndex].type,
              value: [node.type],
            })
          }
        })
      } else {
        this.finalFilters.push({
          key: this.filterMenuItems[filterMenuItemsIndex].type,
          value: [node.type],
        })
      }
    }
  }
  deleteContent(request: NSContent.IContentMeta) {
    this.loadService.changeLoad.next(true)
    this.myContSvc
      .deleteContent(request.identifier, request.contentType === 'Knowledge Board')
      .subscribe(
        () => {
          this.loadService.changeLoad.next(false)
          this.snackBar.openFromComponent(NotificationComponent, {
            data: {
              type: Notify.SUCCESS,
            },
            duration: NOTIFICATION_TIME * 1000,
          })
          this.cardContent = (this.cardContent || []).filter(
            v => v.identifier !== request.identifier,
          )
          if (['Live', 'Unpublished', 'Reviewed'].includes(request.status)) {
            this.notificationSrvc.triggerNotification('delete', request, request.status)
          }
        },
        error => {
          if (error.status === 409) {
            this.dialog.open(ErrorParserComponent, {
              width: '80vw',
              height: '90vh',
              data: {
                errorFromBackendData: error.error,
              },
            })
          }
          this.loadService.changeLoad.next(false)
          this.snackBar.openFromComponent(NotificationComponent, {
            data: {
              type: Notify.CONTENT_FAIL,
            },
            duration: NOTIFICATION_TIME * 1000,
          })
        },
      )
  }

  modifyFilterDisplayName(name: string) {
    if (name === 'Module') {
      return 'Asset'
    }
    if (name === 'Course') {
      return 'Collection'
    }
    return name
  }

  restoreContent(request: NSContent.IContentMeta) {
    this.loadService.changeLoad.next(true)
    this.myContSvc.restoreContent(request.identifier).subscribe(
      () => {
        this.loadService.changeLoad.next(false)
        this.snackBar.openFromComponent(NotificationComponent, {
          data: {
            type: Notify.SUCCESS,
          },
          duration: NOTIFICATION_TIME * 1000,
        })
        this.cardContent = (this.cardContent || []).filter(v => v.identifier !== request.identifier)
      },
      error => {
        if (error.status === 409) {
          this.dialog.open(ErrorParserComponent, {
            width: '80vw',
            height: '90vh',
            data: {
              errorFromBackendData: error.error,
            },
          })
        }
        this.loadService.changeLoad.next(false)
        this.snackBar.openFromComponent(NotificationComponent, {
          data: {
            type: Notify.CONTENT_FAIL,
          },
          duration: NOTIFICATION_TIME * 1000,
        })
      },
    )
  }

  createContent(request: NSContent.IContentMeta) {
    this.loadService.changeLoad.next(true)
    this.myContSvc.createInAnotherLanguage(request.identifier, request.locale).subscribe(
      (id: string) => {
        this.loadService.changeLoad.next(false)
        this.snackBar.openFromComponent(NotificationComponent, {
          data: {
            type: Notify.CONTENT_CREATE_SUCCESS,
          },
          duration: NOTIFICATION_TIME * 1000,
        })
        this.router.navigateByUrl(`/author/editor/${id}`)
      },
      error => {
        if (error.status === 409) {
          this.dialog.open(ErrorParserComponent, {
            width: '750px',
            height: '450px',
            data: {
              errorFromBackendData: error.error,
            },
          })
        }
        this.loadService.changeLoad.next(false)
        this.snackBar.openFromComponent(NotificationComponent, {
          data: {
            type: Notify.CONTENT_FAIL,
          },
          duration: NOTIFICATION_TIME * 1000,
        })
      },
    )
  }

  clearAllFilters() {
    this.finalFilters = []
    this.searchInputElem.nativeElement.value = ''
    this.queryFilter = ''
    this.filterMenuItems.map((val: any) => val.content.map((v: any) => (v.checked = false)))
    this.dataSource.data = this.filterMenuItems
    this.filters = []
    this.fetchContent(false)
  }

  loadMore() {
    this.pagination.offset += 1
    this.fetchContent(true, false)
  }

  confirmAction(content: any) {
    let message = ''
    if (content.type === 'delete') {
      message = 'delete'
    } else if (content.type === 'restoreDeleted') {
      message = 'restoreDeleted'
    } else if (content.type === 'unpublish') {
      message = 'unpublish'
    } else if (content.type === 'moveToDraft' || content.type === 'moveToInReview') {
      if (content.data.mimeType.indexOf('collection') >= 0) {
        message = 'retrieveParent'
      } else {
        message = 'retrieveChild'
      }
    } else {
      this.forwardBackward(content)
      return
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      height: '200px',
      data: message,
    })

    dialogRef.afterClosed().subscribe((confirm: any) => {
      if (confirm) {
        if (content.type === 'delete') {
          this.deleteContent(content.data)
        } else if (content.type === 'restoreDeleted') {
          this.restoreContent(content.data)
        } else if (
          content.type === 'unpublish' ||
          (content.type === 'moveToDraft' || (content.type === 'moveToDraft' && content.data.status === 'Unpublished'))
        ) {
          this.unPublishOrDraft(content.data, content.type)
        } else {
          this.forwardBackward(content)
        }
      }
    })
  }

  allowAccordingToStatus(status: string, actionType?: string) {
    if (actionType) {
      if (actionType === 'unpublish') {
        return true
      }
      if (actionType === 'moveToDraft') {
        return false
      }
    }
    return status !== 'Unpublished'
  }

  unPublishOrDraft(request: NSContent.IContentMeta, actionType?: string) {
    this.loadService.changeLoad.next(true)
    const operation = this.allowAccordingToStatus(request.status, actionType)
    this.myContSvc.upPublishOrDraft(request.identifier, operation).subscribe(
      () => {
        this.loadService.changeLoad.next(false)
        this.snackBar.openFromComponent(NotificationComponent, {
          data: {
            type: Notify.SUCCESS,
          },
          duration: NOTIFICATION_TIME * 1000,
        })
        this.cardContent = (this.cardContent || []).filter(v => v.identifier !== request.identifier)
        // trigger notification
        if (operation) {
          this.notificationSrvc.triggerNotification('unpublish', request, request.status)
        } else {
          this.notificationSrvc.triggerNotification('moveToDraft', request, request.status)
        }
      },
      error => {
        if (error.status === 409) {
          this.dialog.open(ErrorParserComponent, {
            width: '750px',
            height: '450px',
            data: {
              errorFromBackendData: error.error,
            },
          })
        }
        this.loadService.changeLoad.next(false)
        this.snackBar.openFromComponent(NotificationComponent, {
          data: {
            type: Notify.CONTENT_FAIL,
          },
          duration: NOTIFICATION_TIME * 1000,
        })
      },
    )
  }

  forwardBackward(content: any) {
    const dialogRef = this.dialog.open(CommentsDialogComponent, {
      width: '750px',
      height: '450px',
      data: { ...content.data, status: 'Draft' },
    })

    dialogRef.afterClosed().subscribe((commentsForm: FormGroup) => {
      if (commentsForm) {
        this.finalCall(commentsForm, content)
      }
    })
  }

  finalCall(commentsForm: FormGroup, content: any) {
    if (commentsForm) {
      let operationValue: any
      switch (content.type) {
        case 'moveToDraft':
          operationValue = 0
          break
        case 'moveToInReview':
          operationValue = -1
          break
      }
      const body: NSApiRequest.IForwardBackwardActionGeneral = {
        comment: commentsForm.controls.comments.value,
        operation: operationValue,
      }
      this.loadService.changeLoad.next(true)
      this.myContSvc.forwardBackward(body, content.data.identifier, content.data.status).subscribe(
        () => {
          this.loadService.changeLoad.next(false)
          this.snackBar.openFromComponent(NotificationComponent, {
            data: {
              type: Notify.SUCCESS,
            },
            duration: NOTIFICATION_TIME * 1000,
          })
          this.cardContent = (this.cardContent || []).filter(
            v => v.identifier !== content.data.identifier,
          )
        },
        error => {
          if (error.status === 409) {
            this.dialog.open(ErrorParserComponent, {
              width: '80vw',
              height: '90vh',
              data: {
                errorFromBackendData: error.error,
              },
            })
          }
          this.loadService.changeLoad.next(false)
          this.snackBar.openFromComponent(NotificationComponent, {
            data: {
              type: Notify.CONTENT_FAIL,
            },
            duration: NOTIFICATION_TIME * 1000,
          })
        },
      )
    }
  }

  resolveNavigationAction(event: { data: NSContent.IContentMeta; type: string }) {
    this.router.navigateByUrl(`/author/editor/${event.data.identifier}`)
  }

  action(event: { data: NSContent.IContentMeta; type: string }) {
    switch (event.type) {
      case 'create':
        this.createContent(event.data)
        break

      case 'review':
      case 'publish':
      case 'edit':
        this.resolveNavigationAction(event)
        break
      case 'remove':
        this.cardContent = (this.cardContent || []).filter(
          v => v.identifier !== event.data.identifier,
        )
        break
      case 'moveToInReview':
      case 'moveToDraft':
      case 'delete':
      case 'unpublish':
      case 'restoreDeleted':
        this.confirmAction(event)
        break
      case 'expiryExtend':
        this.actionOnExpiry(event.data)
    }
  }

  actionOnExpiry(content: NSContent.IContentMeta) {
    const dialogRef = this.dialog.open(AuthExpiryDateConfirmComponent, {
      width: '750px',
      height: '300px',
      data: content,
    })

    dialogRef.afterClosed().subscribe((userAction?: { isExtend: boolean; expiryDate?: string }) => {
      if (userAction) {
        this.cardContent = (this.cardContent || []).filter(v => v.identifier !== content.identifier)
      }
    })
  }

  setCurrentLanguage(lang: string) {
    this.searchLanguage = lang
  }
}
