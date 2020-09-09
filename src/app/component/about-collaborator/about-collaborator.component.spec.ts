import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { AboutCollaboratorComponent } from './about-collaborator.component'

describe('AboutCollaboratorComponent', () => {
  let component: AboutCollaboratorComponent
  let fixture: ComponentFixture<AboutCollaboratorComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboutCollaboratorComponent],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutCollaboratorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
