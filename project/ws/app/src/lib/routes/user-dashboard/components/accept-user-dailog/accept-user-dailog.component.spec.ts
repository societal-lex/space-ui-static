import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { AcceptUserDailogComponent } from './accept-user-dailog.component'

describe('AcceptUserDailogComponent', () => {
  let component: AcceptUserDailogComponent
  let fixture: ComponentFixture<AcceptUserDailogComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptUserDailogComponent],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptUserDailogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
