import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { GrievanceredressalComponent } from './grievanceredressal.component'

describe('GrievanceredressalComponent', () => {
  let component: GrievanceredressalComponent
  let fixture: ComponentFixture<GrievanceredressalComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GrievanceredressalComponent],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(GrievanceredressalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
