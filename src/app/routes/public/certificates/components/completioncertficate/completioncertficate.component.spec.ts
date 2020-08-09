import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletioncertficateComponent } from './completioncertficate.component';

describe('CompletioncertficateComponent', () => {
  let component: CompletioncertficateComponent;
  let fixture: ComponentFixture<CompletioncertficateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletioncertficateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletioncertficateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
