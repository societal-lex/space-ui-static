import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFooterInsideComponent } from './app-footer-inside.component';

describe('AppFooterInsideComponent', () => {
  let component: AppFooterInsideComponent;
  let fixture: ComponentFixture<AppFooterInsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppFooterInsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFooterInsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
