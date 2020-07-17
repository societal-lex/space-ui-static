import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ContentpolicyandcommunicationComponent } from './contentpolicyandcommunication.component'

describe('ContentpolicyandcommunicationComponent', () => {
  let component: ContentpolicyandcommunicationComponent
  let fixture: ComponentFixture<ContentpolicyandcommunicationComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContentpolicyandcommunicationComponent],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentpolicyandcommunicationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
