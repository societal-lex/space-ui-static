import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { ConfigurationsService, NsPage } from '@ws-widget/utils'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent  {
  pageNavbar: Partial<NsPage.INavBackground> = this.configSvc.pageNavBar
  constructor(private configSvc: ConfigurationsService) {}
  hide = true
  email = new FormControl('', [Validators.required, Validators.email])

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value'
    }

    return this.email.hasError('email') ? 'Not a valid email' : ''
  }
  back() {
    window.history.back()
  }

}
