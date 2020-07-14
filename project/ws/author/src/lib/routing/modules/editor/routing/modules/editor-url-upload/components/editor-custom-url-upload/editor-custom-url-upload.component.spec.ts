import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorCustomUrlUploadComponent } from './editor-custom-url-upload.component';

describe('EditorCustomUrlUploadComponent', () => {
  let component: EditorCustomUrlUploadComponent;
  let fixture: ComponentFixture<EditorCustomUrlUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorCustomUrlUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorCustomUrlUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
