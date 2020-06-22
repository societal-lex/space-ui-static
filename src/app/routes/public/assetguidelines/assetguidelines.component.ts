import { Component, OnInit } from '@angular/core'
import { ConfigurationsService, NsPage } from '@ws-widget/utils'

@Component({
  selector: 'ws-assetguidelines',
  templateUrl: './assetguidelines.component.html',
  styleUrls: ['./assetguidelines.component.scss'],
})
export class AssetguidelinesComponent implements OnInit {

  pageNavbar: Partial<NsPage.INavBackground> = this.configSvc.pageNavBar

  constructor(private configSvc: ConfigurationsService) { }

  ngOnInit() {
  }

}
