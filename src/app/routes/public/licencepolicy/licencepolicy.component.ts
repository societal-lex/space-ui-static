import { Component, OnInit } from '@angular/core'
import { ConfigurationsService, NsPage } from '@ws-widget/utils'

@Component({
  selector: 'ws-licencepolicy',
  templateUrl: './licencepolicy.component.html',
  styleUrls: ['./licencepolicy.component.scss'],
})
export class LicencepolicyComponent implements OnInit {
  pageNavbar: Partial<NsPage.INavBackground> = this.configSvc.pageNavBar

  constructor(private configSvc: ConfigurationsService) { }

  ngOnInit() {
  }

}
