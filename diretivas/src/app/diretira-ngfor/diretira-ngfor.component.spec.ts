import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiretiraNgforComponent } from './diretira-ngfor.component';

describe('DiretiraNgforComponent', () => {
  let component: DiretiraNgforComponent;
  let fixture: ComponentFixture<DiretiraNgforComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiretiraNgforComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiretiraNgforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
