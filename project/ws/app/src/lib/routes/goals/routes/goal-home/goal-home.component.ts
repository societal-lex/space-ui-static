import { Component, OnInit, OnDestroy } from '@angular/core'
import { ConfigurationsService, NsPage } from '@ws-widget/utils'
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { BtnGoalsService } from '@ws-widget/collection'
import { filter } from 'rxjs/operators'

@Component({
  selector: 'ws-app-goal-home',
  templateUrl: './goal-home.component.html',
  styleUrls: ['./goal-home.component.scss'],
})
export class GoalHomeComponent implements OnInit, OnDestroy {
  navBackground: Partial<NsPage.INavBackground>
  userName: string | undefined
  numNotifications = 0
  isShareEnabled = false
  routerEvents$: any
  goalFor = 'me'
  rolesInfo: any
  showOthers = false
  constructor(
    private router: Router,
    private configSvc: ConfigurationsService,
    private goalsSvc: BtnGoalsService,
    private readonly route: ActivatedRoute,
  ) {
    this.navBackground = this.configSvc.pageNavBar
    if (this.configSvc.userProfile) {
      this.userName = (this.configSvc.userProfile.userName || '').split(' ')[0]
    }
  }

  ngOnInit() {
    try {
      this.rolesInfo = this.route.snapshot.data.pageData.data
      // tslint:disable-next-line: max-line-length
      this.routerEvents$ = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((_: any) => { this.updateSettings() })
      if (this.configSvc.restrictedFeatures) {
        this.isShareEnabled = !this.configSvc.restrictedFeatures.has('share')
      }
      this.goalFor = this.router.url.includes('others') ? 'others' : 'me'
      this.goalsSvc.getActionRequiredGoals('isInIntranet').subscribe(actionRequired => {
        this.numNotifications = actionRequired.length
      })
      this.handleRolesSpecificFeatures(this.rolesInfo)
    } catch (e) {
      // tslint:disable-next-line: no-console
      console.error('An error occured while loading goals, redirecting back ', e)
      this.router.navigate(['/app/goals/me/all'])
    }
  }

  ngOnDestroy() {
    this.routerEvents$.unsubscribe()
  }

  updateSettings() {
    this.goalFor = this.router.url.includes('others') ? 'others' : 'me'
    this.rolesInfo = this.route.snapshot.data.pageData.data
    this.handleRolesSpecificFeatures(this.rolesInfo)
  }

  handleRolesSpecificFeatures(_rolesData: any) {
    if (_rolesData) {
      this.showOthers = this.goalsSvc.isVisibileAccToRoles(_rolesData.forOthers.rolesAllowed, _rolesData.forOthers.rolesAllowed)
    } else {
      this.setDefaults()
    }
    if (!this.showOthers && this.goalFor === 'others') {
      this.router.navigate(['/app/goals/me/all'])
    }
  }

  setDefaults() {
    this.showOthers = true
  }

  goalToggle(tab: string) {
    if (tab === 'me') {
      this.router.navigate(['/app/goals/me/all'])
    } else if (tab === 'others') {
      this.router.navigate(['/app/goals/others'])
    }
  }
}
