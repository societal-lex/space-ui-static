import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorCustomFileUploadComponent } from './editor-custom-file-upload.component';

describe('EditorCustomFileUploadComponent', () => {
  let component: EditorCustomFileUploadComponent;
  let fixture: ComponentFixture<EditorCustomFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorCustomFileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorCustomFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
