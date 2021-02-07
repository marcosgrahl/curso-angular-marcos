import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SobreNgContentComponent } from './sobre-ng-content.component';

describe('SobreNgContentComponent', () => {
  let component: SobreNgContentComponent;
  let fixture: ComponentFixture<SobreNgContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SobreNgContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SobreNgContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
