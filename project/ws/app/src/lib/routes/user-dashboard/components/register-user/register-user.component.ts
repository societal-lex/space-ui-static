import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { NsUserDashboard } from '../../models/user-dashboard.model'
import { UserDashboardService } from '../../services/user-dashboard.service'
import { MatSnackBar } from '@angular/material'

@Component({
  selector: 'ws-app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({})
  paramsForCreateNewUser: NsUserDashboard.IHeader = {} as NsUserDashboard.IHeader
  userDashboardData: NsUserDashboard.IUserData | any
  successMessage = ''
  errorMessage = ''
  isLoad = false
  clearValidations = ['firstName', 'lastName', 'email']
  constructor(private formBuilder: FormBuilder, private userDashboardSvc: UserDashboardService, public snackBar: MatSnackBar) { }
  errorMessages = {
    firstName: [
      { type: 'required', message: 'First Name is required.' },
    ],

    lastName: [
      { type: 'required', message: 'Last Name is required.' },
    ],

    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'minlength', message: 'Email length.' },
      { type: 'maxlength', message: 'Email length.' },
      { type: 'email', message: 'please enter a valid email address.' },
    ],

    // password: [
    //   { type: 'required', message: 'Password is required.' },
    //   { type: 'minlength', message: 'Password length required with min 6 characters.' },
    //   { type: 'maxlength', message: 'Password length.' },
    // ],
    // confirmPassword: [
    //   { type: 'required', message: 'Password is required.' },
    //   { type: 'minlength', message: 'Password length required with min 6 characters.' },
    //   { type: 'maxlength', message: 'Password length.' },
    // ],
  }

  ngOnInit() {
    this.userDashboardData = this.userDashboardSvc.getUserDashboardConfig()

    this.successMessage = this.userDashboardData.createUser.successMessage
    this.errorMessage = this.userDashboardData.createUser.errorMessage

    // this.signupForm = new FormGroup({
    //   firstName: new FormControl('', Validators.compose([
    //     Validators.required,
    //   ])),
    //   lastName: new FormControl('', Validators.compose([
    //     Validators.required,
    //   ])),
    //   email: new FormControl('', Validators.compose([
    //     Validators.required,
    //     Validators.minLength(6),
    //   ])),
    //   organisation: new FormControl(),
    //   password: new FormControl('', Validators.compose([
    //     Validators.required,
    //     Validators.minLength(6),
    //   ])),
    //   confirmPassword: new FormControl('', Validators.compose([
    //     Validators.required,
    //     Validators.minLength(6),
    //   ])),
    // // tslint:disable-next-line: align
    // },{
    //     validators: this.password.bind(this),
    //   })
    this.signupForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      lastName: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.email,
      ])),
      organisation: new FormControl(),
      // password: new FormControl('', Validators.compose([
      //   Validators.required,
      //   Validators.minLength(6),
      // ])),
      // confirmPassword: new FormControl('', Validators.compose([
      //   Validators.required,
      //   Validators.minLength(6),
      // ])),
      // tslint:disable-next-line: align
    },

      // {
      //     validators: this.passwordVerify(),
      // }
    )
  }
  onSubmit() {
    this.isLoad = true
    if (this.signupForm) {
      this.paramsForCreateNewUser.firstName = this.signupForm.controls.firstName.value
      this.paramsForCreateNewUser.lastName = this.signupForm.controls.lastName.value
      this.paramsForCreateNewUser.email = this.signupForm.controls.email.value
      this.paramsForCreateNewUser.organisation = this.signupForm.controls.organisation.value
      this.createUser()
    }
  }
  async createUser() {
    const responseForCreateUser = await this.userDashboardSvc.createUserApi(this.paramsForCreateNewUser)
    this.isLoad = false
    this.paramsForCreateNewUser = {} as NsUserDashboard.IHeader
    if (responseForCreateUser.ok) {
      this.clearSignUpForm()
      // tslint:disable-next-line: no-non-null-assertion
      this.snackBar.open(this.successMessage, '', {
        duration: 3000,
      })
    } else {
      this.clearSignUpForm()
      this.snackBar.open(this.errorMessage, '', {
        duration: 3000,
      })
    }
  }

 clearSignUpForm() {
   this.signupForm.reset()
   if (this.signupForm) {
     this.signupForm.controls.firstName.clearValidators()
     this.signupForm.controls.firstName.updateValueAndValidity()
     this.signupForm.controls.lastName.clearValidators()
     this.signupForm.controls.lastName.updateValueAndValidity()
     this.signupForm.controls.email.clearValidators()
     this.signupForm.controls.email.updateValueAndValidity()
   }
  }
  //   passwordVerify() {
  //     if (this.signupForm.controls.password && this.signupForm.controls.confirmPassword) {
  //       const password = this.signupForm.controls.password.value
  //       const confirmPassword = this.signupForm.controls.confirmPassword.value
  //       return password === confirmPassword ? true : false
  //     }
  // return false
  //     // const password = formGroup.get('password')
  //     // const confirmPassword = formGroup.get('confirmPassword')

  //   }

  // isValid() {
  //   console.log("thjispasserr", this.passwordVerify(), "formvalid", this.signupForm.valid)
  //   if (this.signupForm.valid) {
  //     if (this.passwordVerify()) {
  //       return true
  //     }
  //   }
  //     return false
  // }
  // createUser() {

  // }
}
