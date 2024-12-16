import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InscripcionAsignaturaPage } from './inscripcion-asignatura.page';

describe('InscripcionAsignaturaPage', () => {
  let component: InscripcionAsignaturaPage;
  let fixture: ComponentFixture<InscripcionAsignaturaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InscripcionAsignaturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
