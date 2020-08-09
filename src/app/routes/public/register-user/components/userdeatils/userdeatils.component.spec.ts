import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdeatilsComponent } from './userdeatils.component';

describe('UserdeatilsComponent', () => {
  let component: UserdeatilsComponent;
  let fixture: ComponentFixture<UserdeatilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserdeatilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
