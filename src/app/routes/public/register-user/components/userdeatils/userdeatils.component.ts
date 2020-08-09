import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { RegsiterDetailObject } from '../../services/register-user-core.model'
import { ConfigurationsService, NsPage } from '@ws-widget/utils'

@Component({
  selector: 'ws-userdeatils',
  templateUrl: './userdeatils.component.html',
  styleUrls: ['./userdeatils.component.scss']
})
export class UserdeatilsComponent implements OnInit {
  pageNavbar: Partial<NsPage.INavBackground> = this.configSvc.pageNavBar

  currentUserDetails: RegsiterDetailObject = {}
  constructor(private configSvc: ConfigurationsService, private readonly route: ActivatedRoute, private readonly router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      if (!routeData.details) {
        this.router.navigate(['/public/registeredusers'])
      } else {
        this.currentUserDetails = { ...routeData.details }
      }
    })
  }
  viewCertificate(certiType: number, defaultUserID?: number) {
    if (certiType == 1) {
      this.router.navigate([`/public/registeredusers/certificates/${1}/${defaultUserID ? defaultUserID : this.currentUserDetails.source_id}`], { state: this.currentUserDetails, relativeTo: this.route })
    } else if (certiType == 2) {
      this.router.navigate([`/public/registeredusers/certificates/${2}/${defaultUserID ? defaultUserID : this.currentUserDetails.source_id}`], { state: this.currentUserDetails, relativeTo: this.route })
    }
  }



}
