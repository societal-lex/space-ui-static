import { Component, OnInit } from '@angular/core'
import { ConfigurationsService, NsPage } from '@ws-widget/utils'
import { ActivatedRoute, Router } from '@angular/router'
import { RegisterUserCoreService } from '../../register-user/services/register-user-core.service'
@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css'],
})
export class QrcodeComponent implements OnInit {
  pageNavbar: Partial<NsPage.INavBackground> = this.configSvc.pageNavBar
  student: any
  date: any
  data: any
  value = 1
  wid: any
  constructor(private configSvc: ConfigurationsService,
              private router: ActivatedRoute,
              private readonly userDetailsSrvc: RegisterUserCoreService,
              private route: Router,
   ) {}

  back() {
    window.history.back()
  }
ngOnInit() {
  this.router.params.subscribe(params => {
    this.wid = params['userid']

      this.userDetailsSrvc.getUserFromID(this.wid).subscribe(studentData => {
        if (studentData) {
          this.student = { ...studentData }
        } else {
          this.route.navigateByUrl('/')
        }
      })

  })
}

}
