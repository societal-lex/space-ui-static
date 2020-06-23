import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { PublicCollaboratorsComponent } from './public-collaborators.component'

describe('PublicCollaboratorsComponent', () => {
  let component: PublicCollaboratorsComponent
  let fixture: ComponentFixture<PublicCollaboratorsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PublicCollaboratorsComponent],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicCollaboratorsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
