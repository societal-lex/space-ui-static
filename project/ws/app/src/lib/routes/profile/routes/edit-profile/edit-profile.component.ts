import { Component, OnInit } from '@angular/core'
import { InitService } from 'src/app/services/init.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ProfileService } from '../../services/profile.service'
import { MatSnackBar } from '@angular/material'

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
              public snackBar: MatSnackBar) { }
  url = ''
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
  userPropertiesData: NsEditProfile.IUserProperties = {} as NsEditProfile.IUserProperties
  ngOnInit() {

    this.userProfile = this.initService.getUserProfile()
    if (this.userProfile) {
      this.profileForm.controls.givenName.setValue(this.userProfile.givenName)
      this.profileForm.controls.departmentName.setValue(this.userProfile.departmentName)
      this.profileForm.controls.email.setValue(this.userProfile.email)
    }
  }

  onSelectFile(event: any) {
    // console.log("data", event.target.files[0], event.target.src)
    if (event.target.files) {
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      // tslint:disable-next-line: no-shadowed-variable
      reader.onload = (event: any) => {
        this.url = event.target.result
      }
    }
  }

  async onSubmit() {
    if (this.profileForm.valid) {
      this.setFormValues()
      const editresponse = await this.profileSvc.editProfile(this.headersForEditProfile, this.paramsForEditProfile)
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
    this.paramsForEditProfile.sourceProfilePicture = this.url
    this.userPropertiesData.bio = this.profileForm.value.bio
    this.userPropertiesData.profileLink = this.profileForm.value.profileLink
    this.paramsForEditProfile.userProperties = this.userPropertiesData
    this.headersForEditProfile.org = this.profileForm.value.departmentName
    this.headersForEditProfile.rootOrg = 'space'
  }

}
