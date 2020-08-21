import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'ws-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss'],
})
export class StarComponent implements OnInit {
  @Input() starId: any
  @Input() rating: any
  @Output() starEnter: EventEmitter<any> = new EventEmitter()
  @Output() starLeave: EventEmitter<any> = new EventEmitter()
  @Output() starClicked: EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  // onStarEnter() {
  //   this.starEnter.emit(this.starId)
  // }
  onStarLeave() {
    this.starLeave.emit()
  }
  onStarClicked() {
    this.starClicked.emit(this.starId)
  }

}
