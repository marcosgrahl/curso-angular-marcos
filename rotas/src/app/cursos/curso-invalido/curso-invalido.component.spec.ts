import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoInvalidoComponent } from './curso-invalido.component';

describe('CursoInvalidoComponent', () => {
  let component: CursoInvalidoComponent;
  let fixture: ComponentFixture<CursoInvalidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoInvalidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoInvalidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
