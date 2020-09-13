import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayUsersSocialVoteComponent } from './display-users-social-vote.component';

describe('DisplayUsersSocialVoteComponent', () => {
  let component: DisplayUsersSocialVoteComponent;
  let fixture: ComponentFixture<DisplayUsersSocialVoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayUsersSocialVoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayUsersSocialVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
