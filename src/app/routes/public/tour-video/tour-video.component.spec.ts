import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourVideoComponent } from './tour-video.component';

describe('TourVideoComponent', () => {
  let component: TourVideoComponent;
  let fixture: ComponentFixture<TourVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
