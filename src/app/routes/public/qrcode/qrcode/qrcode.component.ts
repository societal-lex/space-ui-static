import { Component, OnInit } from '@angular/core'
import { ConfigurationsService, NsPage } from '@ws-widget/utils'
import { ActivatedRoute, Router } from '@angular/router'
import { RegisterUserCoreService } from '../../register-user/qrcode/services/register-user-core.service'
import * as d3 from 'd3'
import * as d3Cloud from 'd3-cloud'
declare var wordCloudModule: any
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
  wordcloud = []
  alldata: any
  title: any
  res: any
hide  = false
  constructor(private configSvc: ConfigurationsService,
              private router: ActivatedRoute,
              private readonly userDetailsSrvc: RegisterUserCoreService,
              private route: Router

  ) { }

  back() {
    window.history.back()
  }
  ngOnInit() {
    this.createWordCloudDynamically();
    const currentDate = new Date()
    this.date = currentDate.toDateString().split(' ').slice(1).join(' ')

    this.router.params.subscribe(params => {
      this.wid = params['userid']

      this.userDetailsSrvc.getUserFromID(this.wid).subscribe(studentData => {
        if (studentData) {
          this.student = { ...studentData }

          // this.wordcloud = studentData['comments']
          // this.data = this.wordcloud.map(({ comments }) => comments).join(" ");
          // this.alldata = this.data
          // console.log('container id = ', `#${studentData.divid}`, 'Hello world', this.data);
          // wordCloudModule(d3, d3Cloud).wordCloudGenerator({
          //   containerid: `#${studentData.divid}`,
          //   wordclouddata: this.data,
          //   stopwords: 'this as of a was is new old how'
          // });
        } else {
          this.route.navigateByUrl('/')
        }
      })

    })

  }
  createWordCloudDynamically() {
    this.router.params.subscribe(params => {
      this.wid = params['userid']
      this.userDetailsSrvc.getUserFromID(this.wid).subscribe(response => {
        this.res = { ...response }
        this.wordcloud = response['comments']
        if (this.wordcloud.length <= 0) {
          this.hide = true;
        }
        this.data = this.wordcloud.map(({ comments }) => comments).join(' ')
        this.alldata = this.data

        wordCloudModule(d3, d3Cloud).wordCloudGenerator({
          containerid: `#${response.divid}`,
          wordclouddata: this.alldata,
          stopwords: 'this as of a was is new old how',
        })
      })

    })
  }

  }
