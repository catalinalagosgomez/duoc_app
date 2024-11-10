import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
  qrCodeId: string | null = null; // Cambiado a string para manejar el ID único de Firestore

  constructor(private firestore: AngularFirestore) {}

  updateSections() {
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
      // Genera un ID único usando Firestore
      this.qrCodeId = this.firestore.createId();  // Crea un ID único para este QR

      // Genera el código QR con el ID único generado por Firestore
      this.qrCodeData = await QRCode.toDataURL(this.qrCodeId);

      // Guarda el QR con la asignatura y sección en Firestore
      await this.saveQRToFirestore(this.qrCodeId, this.selectedAsignatura, this.selectedSeccion);
    } else {
      alert('Por favor selecciona una asignatura y una sección.');
    }
  }

  // Función para guardar los datos en Firestore
  private async saveQRToFirestore(qrId: string, asignatura: string, seccion: string) {
    try {
      // Guardamos los datos en Firestore bajo una colección 'codigoQR'
      await this.firestore.collection('codigoQR').doc(qrId).set({
        asignatura: asignatura,
        identificacion: qrId,  // Usamos el ID del QR como identificación
        seccion: seccion,
        timestamp: new Date().toISOString(),  // Timestamp actual
      });

      console.log("Datos del QR guardados en Firestore");
    } catch (error) {
      console.error("Error al guardar los datos del QR en Firestore", error);
      alert("Error al guardar el código QR en Firestore.");
    }
  }
}
