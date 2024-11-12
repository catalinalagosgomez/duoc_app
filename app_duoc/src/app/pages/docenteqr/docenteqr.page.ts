import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import QRCode from 'qrcode';

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
  profesor: string | null = null; 

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth 
  ) {
    this.auth.user.subscribe(user => {
      this.profesor = user?.displayName || user?.email || null; 
    });
  }

  updateSections() {
    const seccionesPorAsignatura: { [key: string]: string[] } = {
      'Programacion': ['PGY_1', 'PGY_2', 'PGY_3'],
      'Base de Datos': ['BD_1', 'BD_2', 'BD_3'],
      'Calidad': ['CAL_1', 'CAL_2', 'CAL_3'],
    };
    this.secciones = seccionesPorAsignatura[this.selectedAsignatura || ''] || [];
  }

  async generateQR() {
    if (this.selectedAsignatura && this.selectedSeccion) {
      this.qrCodeId = this.firestore.createId();
      this.qrCodeData = await QRCode.toDataURL(this.qrCodeId);
      await this.saveQRToFirestore(this.qrCodeId, this.selectedAsignatura, this.selectedSeccion);
    } else {
      alert('Por favor selecciona una asignatura y una sección.');
    }
  }

  private async saveQRToFirestore(qrId: string, asignatura: string, seccion: string) {
    try {
      // Configuración de hora de Chile
      const chileDate = new Date();
      const chileOptions: Intl.DateTimeFormatOptions = { 
        timeZone: 'America/Santiago', 
        hour: '2-digit' as const, 
        minute: '2-digit' as const, 
        second: '2-digit' as const 
      };
      const horaChile = chileDate.toLocaleTimeString('es-CL', chileOptions);
      const fechaChile = chileDate.toLocaleDateString('es-CL');


      // Guardar en Firestore
      await this.firestore.collection('codigoQR').doc(qrId).set({
        asignatura: asignatura,
        identificacion: qrId,
        seccion: seccion,
        profesor: this.profesor,
        fecha: fechaChile,      // Fecha en formato legible
        hora: horaChile,        // Hora en formato legible
      });

      console.log("Datos del QR guardados en Firestore con fecha, hora y timestamp.");
    } catch (error) {
      console.error("Error al guardar los datos del QR en Firestore", error);
      alert("Error al guardar el código QR en Firestore.");
    }
  }
}
