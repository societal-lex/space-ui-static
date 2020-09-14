import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { SafeUrl } from '@angular/platform-browser'
import { NsPage, ConfigurationsService } from '../../../../../library/ws-widget/utils/src/public-api'

@Component({
  selector: 'ws-tour-video',
  templateUrl: './tour-video.component.html',
  styleUrls: ['./tour-video.component.scss'],
})
export class TourVideoComponent implements OnInit {
  url: SafeUrl | any
  constructor(private router: ActivatedRoute, private configSvc: ConfigurationsService) { }
  pageNavbar: Partial<NsPage.INavBackground> = this.configSvc.pageNavBar

  ngOnInit() {
    this.router.data.subscribe(response => {
      this.url = response.pageData.data.introVideo.en
    })
  }
}
