import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { CreateUserDailogComponent } from './create-user-dailog.component'

describe('CreateUserDailogComponent', () => {
  let component: CreateUserDailogComponent
  let fixture: ComponentFixture<CreateUserDailogComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUserDailogComponent],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserDailogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
