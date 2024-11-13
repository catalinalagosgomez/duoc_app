import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../services/auth.service';

interface Asistencia {
  fecha: string;
  asignatura: string;
  seccion: string;
  estado: string;
}

@Component({
  selector: 'app-historial-asistencia',
  templateUrl: './historial-asistencia.page.html',
  styleUrls: ['./historial-asistencia.page.scss'],
})
export class HistorialAsistenciaPage implements OnInit {
  attendanceRecords: Asistencia[] = [];
  
  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadAttendanceHistory();
  }

  async loadAttendanceHistory() {
    try {
      const userId = (await this.authService.getCurrentUser()).uid;
      
      this.firestore
        .collection('users')
        .doc(userId)
        .collection('historial-asistencias', ref => 
          ref.orderBy('fecha', 'desc'))
        .valueChanges()
        .subscribe((asistencias: Asistencia[]) => {
          this.attendanceRecords = asistencias;
          console.log('Historial cargado:', this.attendanceRecords);
        });
    } catch (error) {
      console.error('Error al cargar historial:', error);
    }
  }

  navigateToHomeAlumno() {
    this.router.navigate(['/home-alumno']);
  }
}
