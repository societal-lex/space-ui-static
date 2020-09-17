import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'ws-analytics-analytics-tile',
  templateUrl: './analytics-tile.component.html',
  styleUrls: ['./analytics-tile.component.scss'],
})
export class AnalyticsTileComponent implements OnInit {
  @Input() uniqueUsers!: number
  @Input() description!: string
  @Input() title!: string
  @Input() category1!: string
  @Input() category2!: string
  @Input() showToolTip = false
  @Input() category3!: string
  @Output() clickEvent = new EventEmitter<string>()
  @Output() infoClick = new EventEmitter<string>()

  constructor() { }

  ngOnInit() {
    if (this.title === '# Courses') {
      this.title = '# Collections'
    }
    if (this.title === '# Modules') {
      this.title = '# Assets'
    }
    this.description = this.description.replace('collections', 'assets')
    this.description = this.description.replace('courses', 'collections')
    this.description = this.description.replace('modules', 'assets')
  }
  onClick(type: string) {
    this.clickEvent.emit(type)
  }

  triggerInfoPopup(data = this.title) {
    this.infoClick.emit(data)
  }

}
