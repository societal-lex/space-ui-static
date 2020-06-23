import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { AppCollaboratorsComponent } from './app-collaborators.component'

describe('AppCollaboratorsComponent', () => {
  let component: AppCollaboratorsComponent
  let fixture: ComponentFixture<AppCollaboratorsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppCollaboratorsComponent],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCollaboratorsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
