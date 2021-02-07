import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgifExe2Component } from './ngif-exe2.component';

describe('NgifExe2Component', () => {
  let component: NgifExe2Component;
  let fixture: ComponentFixture<NgifExe2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgifExe2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgifExe2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
