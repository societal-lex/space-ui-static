import { Component, OnInit } from '@angular/core'
import { ConfigurationsService, NsPage } from '@ws-widget/utils'

@Component({
  selector: 'ws-grievanceredressal',
  templateUrl: './grievanceredressal.component.html',
  styleUrls: ['./grievanceredressal.component.scss'],
})
export class GrievanceredressalComponent implements OnInit {
  pageNavbar: Partial<NsPage.INavBackground> = this.configSvc.pageNavBar

  constructor(private configSvc: ConfigurationsService) { }

  ngOnInit() {
  }

}
