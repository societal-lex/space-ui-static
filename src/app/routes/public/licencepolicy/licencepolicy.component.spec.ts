import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { LicencepolicyComponent } from './licencepolicy.component'

describe('LicencepolicyComponent', () => {
  let component: LicencepolicyComponent
  let fixture: ComponentFixture<LicencepolicyComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LicencepolicyComponent],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LicencepolicyComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
