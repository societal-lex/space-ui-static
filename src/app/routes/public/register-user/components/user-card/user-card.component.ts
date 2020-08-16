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
  @Output() onStarClick = new EventEmitter<any>()
  @Output() onViewUserDetails = new EventEmitter<any>()
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
    this.onStarClick.emit(this.registeredUser)
  }

  viewUserDetails(_registeredUser: any) {
    this.onViewUserDetails.emit(_registeredUser)
  }

}
