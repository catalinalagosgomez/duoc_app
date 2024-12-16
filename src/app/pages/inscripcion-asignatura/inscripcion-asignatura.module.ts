import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscripcionPageRoutingModule } from './inscripcion-asignatura-routing.module';

import { InscripcionAsignaturaPage } from './inscripcion-asignatura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InscripcionPageRoutingModule
  ],
  declarations: [InscripcionAsignaturaPage]
})
export class InscripcionPageModule {}
