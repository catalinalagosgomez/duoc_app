import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial-asistencia',
  templateUrl: './historial-asistencia.page.html',
  styleUrls: ['./historial-asistencia.page.scss'],
})
export class HistorialAsistenciaPage {
  selectedDate: string = '';  // Asegúrate de declarar 'selectedDate' aquí
  attendanceRecords: { date: string, status: string }[] = [];  // Arreglo para los registros de asistencia

  constructor(private router: Router) {}

  // Método para simular la obtención de registros de asistencia
  fetchAttendance() {
    // Lógica simulada para la obtención de datos
    this.attendanceRecords = [
      { date: '2024-09-18', status: 'Presente' },
      { date: '2024-09-17', status: 'Ausente' },
      { date: '2024-09-16', status: 'Presente' },
    ];
  }

  // Método para navegar a home-alumno
  navigateToHomeAlumno() {
    this.router.navigate(['/home-alumno']);
  }
}
