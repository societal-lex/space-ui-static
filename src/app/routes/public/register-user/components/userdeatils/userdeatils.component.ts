import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { IRegsiterDetailObject } from '../../services/register-user-core.model'
import { ConfigurationsService, NsPage } from '@ws-widget/utils'

@Component({
  selector: 'ws-userdeatils',
  templateUrl: './userdeatils.component.html',
  styleUrls: ['./userdeatils.component.scss'],
})
export class UserdeatilsComponent implements OnInit {
  pageNavbar: Partial<NsPage.INavBackground> = this.configSvc.pageNavBar

  currentUserDetails: IRegsiterDetailObject = {}
  constructor(private configSvc: ConfigurationsService, private readonly route: ActivatedRoute, private readonly router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      if (!routeData.details) {
        this.router.navigate(['/public/guides'])
      } else {
        this.currentUserDetails = { ...routeData }
      }
    })
  }
  viewCertificate(certiType: number, defaultUserID?: string) {
    // if(this.currentUserDetails.employment_status==="Achievement")
    if (certiType === 1) {
      this.router.navigate([`/public/guides/certificates/${1}/${defaultUserID ? defaultUserID :
        this.currentUserDetails.source_id}`],
                           { state: this.currentUserDetails, relativeTo: this.route })
    } else if (certiType === 2) {
      this.router.navigate([`/public/guides/certificates/${2}/${defaultUserID ? defaultUserID :
        this.currentUserDetails.source_id}`],
                           { state: this.currentUserDetails, relativeTo: this.route })
    }
  }

}
