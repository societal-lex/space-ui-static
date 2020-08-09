import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from "@angular/router"
import { RegisterUserCoreService } from '../../../register-user/services/register-user-core.service'
@Component({
  selector: 'app-completioncertficate',
  templateUrl: './completioncertficate.component.html',
  styleUrls: ['./completioncertficate.component.css']
})
export class CompletioncertficateComponent implements OnInit {

  student: any
  date: any
  data: any
  value: number = 1;
  wid: any
  constructor(private router: ActivatedRoute, private readonly userDetailsSrvc: RegisterUserCoreService) {
    console.log('inside component also')
  }
  ngOnInit() {
    this.date = new Date().toDateString()
    this.router.params.subscribe(params => {
      this.value = parseInt(params["stage"])
      this.wid = parseInt(params["userid"])
      this.userDetailsSrvc.getUserFromID(this.wid).subscribe(studentData => {
        console.log('recieved student data as ', studentData)
        if (studentData) {
          this.student = { ...studentData }
        }
      })
    })
  }
}
