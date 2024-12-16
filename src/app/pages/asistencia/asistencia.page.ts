import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service'; // Asegúrate de importar el servicio
import { Router } from '@angular/router';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  asistencias: any[] = [];  // Lista de asistencias

  constructor(private firebaseService: FirebaseService, private router: Router) {}

  async ngOnInit() {
    // Obtén las asistencias desde Firebase
    this.asistencias = await this.firebaseService.getAsistencias();
  }

  goBack() {
    this.router.navigate(['/home-alumno']); // Esto navega hacia la página anterior
  }
}
