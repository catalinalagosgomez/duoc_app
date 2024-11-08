import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import QRCode from 'qrcode';  // Asegúrate de haber instalado 'qrcode' (npm install qrcode)

@Component({
  selector: 'app-docenteqr',
  templateUrl: './docenteqr.page.html',
  styleUrls: ['./docenteqr.page.scss'],
})
export class DocenteqrPage {
  asignaturas = ['Programacion', 'Base de Datos', 'Calidad'];
  secciones: string[] = [];
  selectedAsignatura: string | undefined;
  selectedSeccion: string | undefined;
  qrCodeData: string | null = null;
  qrCodeId: string | null = null;

  constructor(private db: AngularFireDatabase) {}

  updateSections() {
    // Actualiza las secciones según la asignatura seleccionada
    switch (this.selectedAsignatura) {
      case 'Programacion':
        this.secciones = ['PGY_1', 'PGY_2', 'PGY_3'];
        break;
      case 'Base de Datos':
        this.secciones = ['BD_1', 'BD_2', 'BD_3'];
        break;
      case 'Calidad':
        this.secciones = ['CAL_1', 'CAL_2', 'CAL_3'];
        break;
    }
  }

  async generateQR() {
    if (this.selectedAsignatura && this.selectedSeccion) {
      // Genera un ID único basado en la asignatura y la sección
      this.qrCodeId = `${this.selectedAsignatura}-${this.selectedSeccion}`;
      
      // Genera el código QR como una imagen de base64
      this.qrCodeData = await QRCode.toDataURL(this.qrCodeId);
    } else {
      alert('Por favor selecciona una asignatura y una sección.');
    }
  }
}
