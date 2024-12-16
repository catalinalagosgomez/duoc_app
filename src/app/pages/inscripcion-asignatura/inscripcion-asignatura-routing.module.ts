import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscripcionAsignaturaPage } from './inscripcion-asignatura.page';

const routes: Routes = [
  {
    path: '',
    component:InscripcionAsignaturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscripcionPageRoutingModule {}
