import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
// import { IRegsiterDetailObject } from '../../services/register-user-core.model'
import { ConfigurationsService, NsPage } from '@ws-widget/utils'
import { RegisterUserCoreService } from '../../services/register-user-core.service'

@Component({
  selector: 'ws-userdeatils',
  templateUrl: './userdeatils.component.html',
  styleUrls: ['./userdeatils.component.scss'],
})
export class UserdeatilsComponent implements OnInit {

  stars = [1, 2, 3, 4, 5]
  rating = 2
  hoverState = 0
  pageNavbar: Partial<NsPage.INavBackground> = this.configSvc.pageNavBar

  currentUserDetails: any = {}
  constructor(private configSvc: ConfigurationsService, private readonly route: ActivatedRoute,
    private readonly router: Router, private registerUserSrvc: RegisterUserCoreService) { }

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
        this.currentUserDetails.details.source_id}`],
        { state: this.currentUserDetails, relativeTo: this.route })
    } else if (certiType === 2) {
      this.router.navigate([`/public/guides/certificates/${2}/${defaultUserID ? defaultUserID :
        this.currentUserDetails.details.source_id}`],
        { state: this.currentUserDetails, relativeTo: this.route })
    }
  }

  onStarEnter(starId: any) {
    this.hoverState = starId

  }
  onStarLeave() {
    this.hoverState = 0
  }


  onStarClick(starID: number) {
    console.log('recieved data for api handling', this.currentUserDetails.details.source_id + '--> ' + this.currentUserDetails.details.rating)
    this.currentUserDetails.details.rating = starID
    this.registerUserSrvc.updateRating(this.currentUserDetails.details.source_id as string, this.currentUserDetails.details.rating as number).subscribe(ratingRes => {
      console.log('rating status', ratingRes)
    }, err => {
      console.error('Could not update the rating of the user', err)
    })
  }


}
