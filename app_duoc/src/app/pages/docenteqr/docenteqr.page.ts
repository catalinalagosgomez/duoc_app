import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importa el servicio de autenticación
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
  profesor: string | null = null; // Variable para almacenar el nombre o ID del profesor

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth // Inyecta el servicio de autenticación
  ) {
    // Obtén el nombre o ID del profesor que inició sesión
    this.auth.user.subscribe(user => {
      this.profesor = user?.displayName || user?.email || null; // Usa el nombre o email del profesor
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
      const chileTime = new Date().toISOString();

      await this.firestore.collection('codigoQR').doc(qrId).set({
        asignatura: asignatura,
        identificacion: qrId,
        seccion: seccion,
        profesor: this.profesor, // Guarda el nombre o ID del profesor a cargo
        timestamp: chileTime,
      });

      console.log("Datos del QR guardados en Firestore");
    } catch (error) {
      console.error("Error al guardar los datos del QR en Firestore", error);
      alert("Error al guardar el código QR en Firestore.");
    }
  }
}
