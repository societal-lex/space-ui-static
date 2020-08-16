import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { IRegsiterDetailObject } from '../../services/register-user-core.model'

@Component({
  selector: 'ws-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() registeredUser: IRegsiterDetailObject = {}
  @Input() stars: number[] = []

  @Output() oStarClick = new EventEmitter<any>()
  @Output() oViewUserDetails = new EventEmitter<any>()

  hoverState = 0
  constructor() { }

  ngOnInit() {
  }

  starEnter(starId: any) {
    this.hoverState = starId

  }

  starLeave() {
    this.hoverState = 0
  }

  starClick(starId: any) {
    this.registeredUser.rating = starId
    this.oStarClick.emit(this.registeredUser)
  }

  viewUserDetails(_registeredUser: any) {
    this.oViewUserDetails.emit(_registeredUser)
  }

}
