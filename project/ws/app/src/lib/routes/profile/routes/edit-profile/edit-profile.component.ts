
import { Component, OnInit } from '@angular/core'
import { InitService } from 'src/app/services/init.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ProfileService } from '../../services/profile.service'
import { MatSnackBar } from '@angular/material'
import { UploadService } from '../../../../../../../author/src/lib/routing/modules/editor/shared/services/upload.service'
import { CONTENT_BASE_STATIC } from '../../../../../../../author/src/lib/constants/apiEndpoints'
import { ActivatedRoute } from '@angular/router'
import { FOLDER_NAME_EDIT_PROFILE } from '../../../../../../../author/src/lib/constants/constant'

export namespace NsEditProfile {
  export interface IResponseBody {
    wid: string,
    userFirstName: string,
    userLastName: string,
    sourceProfilePicture: string,
    userProperties: IUserProperties,
  }
  export interface IUserProperties {
    bio: string,
    profileLink: string
  }
}
@Component({
  selector: 'ws-app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  paramsForEditProfile: NsEditProfile.IResponseBody = {} as NsEditProfile.IResponseBody
  headersForEditProfile: any = {} as any
  constructor(private initService: InitService,
              private profileSvc: ProfileService,
              private uploadService: UploadService,
              private snackBar: MatSnackBar,
              private activateRoute: ActivatedRoute) { }
  url = ''
  profileUrlParams = ''
  // relativeUrl = 'https://png.pngitem.com/pimgs/s/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'
  profileForm: FormGroup = new FormGroup({
    givenName: new FormControl(''),
    departmentName: new FormControl(''),
    email: new FormControl({ value: '', disabled: true }),
    profileLink: new FormControl(''),
    sourceProfileLinkImage: new FormControl(''),
    bio: new FormControl('', Validators.maxLength(1000)),
    lastname: new FormControl(''),
  })
  userProfile: any
  userConfigData: any
  rootOrg = ''
  userPropertiesData: NsEditProfile.IUserProperties = {} as NsEditProfile.IUserProperties
  isLoad = false
  ngOnInit() {
    this.activateRoute.data.subscribe(data => {
      this.userConfigData = data.pageData.data
      this.rootOrg = data.pageData.data.root_org
      this.profileSvc.setUserEditProfileConfig(this.userConfigData)
    })
    this.userProfile = this.initService.getUserProfile()
    if (this.userProfile) {
      this.profileForm.controls.givenName.setValue(this.userProfile.givenName)
      this.profileForm.controls.departmentName.setValue(this.userProfile.departmentName)
      this.profileForm.controls.lastname.setValue(this.userProfile.lastname)
      this.profileForm.controls.email.setValue(this.userProfile.email)
      this.profileForm.controls.lastname.setValue(this.userProfile.lastName)
      if (this.userProfile.userProperties) {
        this.profileForm.controls.bio.setValue(this.userProfile.userProperties.bio)
        this.profileForm.controls.profileLink.setValue(this.userProfile.userProperties.profileLink)
      }
      const url = this.userProfile.source_profile_picture
      if (url) {
        this.url = this.getAuthoringUrl(url)
      }
    }
  }
  onSelectFile(file: File) {
    const formdata = new FormData()
    const fileName = file.name.replace(/[^A-Za-z0-9.]/g, '')
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      // tslint:disable-next-line: no-shadowed-variable
      reader.onload = (file: any) => {
        this.url = file.target.result
      }
      formdata.append('content', file, fileName)
      // tslint:disable-next-line: no-console
      this.uploadService
        .upload(formdata, {
          contentId: FOLDER_NAME_EDIT_PROFILE,
          contentType: CONTENT_BASE_STATIC,
        })
        .subscribe(
          data => {
            if (data.code) {
              this.profileUrlParams = data.artifactURL
            }
          })
    }
  }
  // public delete() {
  //   this.url = 'https://png.pngitem.com/pimgs/s/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'
  // }
  getAuthoringUrl(url: string): string {
    return url
      ? `/apis/authContent/${
      url.includes('/content-store/') ? new URL(url).pathname.slice(1) : encodeURIComponent(url)
      }`
      : ''
  }

  isDisabled() {
    if (!this.profileForm.controls.givenName.value) {
      return true
    }
    if (this.profileUrlParams || this.profileForm.dirty) {
      return false
    }
    return true
  }
  async onSubmit() {
    if (this.profileForm.valid) {
      this.isLoad = true
      this.setFormValues()
      const editresponse = await this.profileSvc.editProfile(this.headersForEditProfile, this.paramsForEditProfile)
      this.isLoad = false
      this.paramsForEditProfile = {} as NsEditProfile.IResponseBody
      this.userPropertiesData = {} as NsEditProfile.IUserProperties
      if (editresponse.ok) {
        if (editresponse.DATA != null) {
          this.snackBar.open(editresponse.MESSAGE, '', {
            duration: 1000,
          })
        }
      } else {
        this.snackBar.open(editresponse.MESSAGE, '', {
          duration: 1000,
        })
      }
    }
  }
  setFormValues() {
    this.paramsForEditProfile.wid = this.userProfile.userId
    this.paramsForEditProfile.userFirstName = this.profileForm.value.givenName
    this.paramsForEditProfile.userLastName = this.profileForm.value.lastname
    if (this.profileUrlParams) {
      this.paramsForEditProfile.sourceProfilePicture = this.profileUrlParams
    } else {
      this.paramsForEditProfile.sourceProfilePicture = this.userProfile.source_profile_picture
    }
    this.userPropertiesData.bio = this.profileForm.value.bio
    this.userPropertiesData.profileLink = this.profileForm.value.profileLink
    this.paramsForEditProfile.userProperties = this.userPropertiesData
    this.headersForEditProfile.org = this.profileForm.value.departmentName
    this.headersForEditProfile.rootOrg = this.rootOrg
  }

}
