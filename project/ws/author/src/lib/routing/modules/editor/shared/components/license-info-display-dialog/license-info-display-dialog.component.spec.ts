import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseInfoDisplayDialogComponent } from './license-info-display-dialog.component';

describe('LicenseInfoDisplayDialogComponent', () => {
  let component: LicenseInfoDisplayDialogComponent;
  let fixture: ComponentFixture<LicenseInfoDisplayDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseInfoDisplayDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseInfoDisplayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
