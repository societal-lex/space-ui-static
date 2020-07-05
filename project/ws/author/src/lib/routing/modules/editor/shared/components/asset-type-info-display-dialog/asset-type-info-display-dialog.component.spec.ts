import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { AssetTypeInfoDisplayDialogComponent } from './asset-type-info-display-dialog.component'

describe('AssetTypeInfoDisplayDialogComponent', () => {
  let component: AssetTypeInfoDisplayDialogComponent
  let fixture: ComponentFixture<AssetTypeInfoDisplayDialogComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetTypeInfoDisplayDialogComponent],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetTypeInfoDisplayDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
