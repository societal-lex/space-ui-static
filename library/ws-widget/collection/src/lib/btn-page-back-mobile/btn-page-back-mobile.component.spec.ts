import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { BtnPageBackMobileComponent } from './btn-page-back-mobile.component'

describe('BtnPageBackMobileComponent', () => {
  let component: BtnPageBackMobileComponent
  let fixture: ComponentFixture<BtnPageBackMobileComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BtnPageBackMobileComponent],
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnPageBackMobileComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
