import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { RegisterUserCoreService } from '../../../register-user/services/register-user-core.service'
@Component({
  selector: 'app-completioncertficate',
  templateUrl: './completioncertficate.component.html',
  styleUrls: ['./completioncertficate.component.css'],
})
export class CompletioncertficateComponent implements OnInit {

  student: any
  date: any
  data: any
  value = 1
  wid: any
  constructor(private router: ActivatedRoute, private readonly userDetailsSrvc: RegisterUserCoreService, private route: Router) {
  }
  ngOnInit() {
    this.date = new Date().toDateString()
    this.router.params.subscribe(params => {
      this.value = parseInt(params['stage'], 10)
      this.wid = params['userid']

      if ((this.value === 1 || this.value === 2) && this.wid) {
        this.userDetailsSrvc.getUserFromID(this.wid).subscribe(studentData => {
          if (studentData) {
            this.student = { ...studentData }
          } else {
            this.route.navigateByUrl('/public/guides')
          }
        })
      } else {
        this.route.navigateByUrl('/public/guides')
      }

      // this.userDetailsSrvc.getUserFromID(this.wid).subscribe(studentData => {
      //   if (studentData) {
      //     this.student = { ...studentData }
      //   }
      // })
    })
  }
}
