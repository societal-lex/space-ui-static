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
  constructor(private configSvc: ConfigurationsService, private readonly route: ActivatedRoute,
    private readonly router: Router, private registerUserSrvc: RegisterUserCoreService) { }

  stars = [1, 2, 3, 4, 5]
  rating = 2
  hoverState = 0
  myArray = []

  reviewpeople = [{
    "name": "Sumit Nautiyal",
    "comments": "Very good website for the bird guides.",
  },
  {
    "name": "Tanya Chauhan",
    "comments": "Very helpful for the people they can certify themselves ",
  },
  {
    "name": "Anjitha R.",
    "comments": "Very helpful for the guides",
  }]
  // ['Very good website for guides', 'Very helpful for the guides', 'I love this']

  selectedFeatures: any = []

  pageNavbar: Partial<NsPage.INavBackground> = this.configSvc.pageNavBar

  currentUserDetails: any = {}

  public name: any
  public str: any
  placeId: any

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

  oStarClick(starID: number) {
    this.currentUserDetails.details.rating = starID
    this.registerUserSrvc.updateRating(
      this.currentUserDetails.details.source_id as string,
      this.currentUserDetails.details.rating as number)
      .subscribe(_ratingRes => {
        // console.log('rating status', ratingRes)
      }, _err => {
        // console.error('Could not update the rating of the user', err)
      })
  }

  changeLabelName() {
    this.name = this.str
  }
  myFunc(_num1: any) {
    // console.log(num1)// here you will get input value through ng-model

  }

  // addNew() {
  //   [...this.myArray]
  //   console.log(this.myArray)
  // }

  // onAdd() {
  //   this.selectedFeatures.push(this.feature)
  // }

  // onRemove() {
  //   this.selectedFeatures.pop()
  // }
  // addHero(newHero: string) {
  //   if (newHero) {
  //     this.reviewpeople.push(newHero)
  //   }
  // }

}
