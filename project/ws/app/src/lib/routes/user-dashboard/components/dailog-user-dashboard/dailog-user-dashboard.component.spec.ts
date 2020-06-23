import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { DailogUserDashboardComponent } from './dailog-user-dashboard.component'

describe('DailogUserDashboardComponent', () => {
  let component: DailogUserDashboardComponent
  let fixture: ComponentFixture<DailogUserDashboardComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DailogUserDashboardComponent],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DailogUserDashboardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
