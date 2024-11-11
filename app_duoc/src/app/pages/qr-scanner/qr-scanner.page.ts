import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importamos AngularFirestore para Firestore
import { Platform } from '@ionic/angular'; // Importamos Platform para detectar la plataforma

interface Student {
  name: string;
  email: string;
  role: string;
  uid: string;
}

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
  providers: [BarcodeScanner] // No es necesario agregar Geolocation aquí
})
export class QrScannerPage {
  selectedAsignatura: string | null = null;
  selectedSeccion: string | null = null;
  isReadyToScan: boolean = false;

  asignaturas = ['Programación', 'Base de Datos', 'Calidad'];
  secciones = {
    'Programación': ['PGY_1', 'PGY_2', 'PGY_3'],
    'Base de Datos': ['BD_1', 'BD_2', 'BD_3'],
    'Calidad': ['CAL_1', 'CAL_2', 'CAL_3']
  };
  seccionesFiltradas: string[] = [];

  constructor(
    private router: Router,
    private barcodeScanner: BarcodeScanner,
    private alertController: AlertController,
    private firestore: AngularFirestore, // Inyectamos AngularFirestore
    private platform: Platform // Inyectamos Platform para detectar la plataforma
  ) {}

  onSelectAsignatura() {
    if (this.selectedAsignatura) {
      this.seccionesFiltradas = this.secciones[this.selectedAsignatura];
      this.selectedSeccion = null; // Resetea la sección seleccionada
      this.updateIsReadyToScan();
    }
  }

  onSelectSeccion() {
    this.updateIsReadyToScan();
  }

  updateIsReadyToScan() {
    this.isReadyToScan = !!this.selectedAsignatura && !!this.selectedSeccion;
  }

  async startScan() {
    if (this.isReadyToScan) {

      this.barcodeScanner.scan().then(barcodeData => {
        if (barcodeData.cancelled) {
          console.log("Escaneo cancelado.");
          return;
        }

        // Procesa el código escaneado
        console.log("Código QR escaneado:", barcodeData.text);

        // Aquí validamos el ID del QR escaneado (que debe ser el uid del estudiante)
        this.markAsPresent(barcodeData.text);
      }).catch(async err => {
        console.error("Error en el escaneo:", err);
        await this.showErrorAlert("Error al escanear el código QR. Inténtelo de nuevo.");
      });
    } else {
      await this.showErrorAlert("Seleccione asignatura y sección antes de escanear.");
    }
  }


  // Función para marcar como presente en Firestore
  private async markAsPresent(uidEstudiante: string) {
    try {
      const userDocRef = this.firestore.collection('users').doc(uidEstudiante);
      const userDoc = await userDocRef.get().toPromise();

      if (userDoc.exists) {
        const studentData = userDoc.data() as Student; // Aseguramos que sea del tipo Student
        console.log("Datos del estudiante:", studentData);

        if (studentData) {
          const nombreEstudiante = studentData.name;
          const asignatura = this.selectedAsignatura;
          const seccion = this.selectedSeccion;

          const presenciaRef = this.firestore.collection('presencias').add({
            uidEstudiante: uidEstudiante,
            nombre: nombreEstudiante,
            asignatura: asignatura,
            seccion: seccion,
            timestamp: new Date().toISOString(),
          });

          console.log("Presencia registrada para:", nombreEstudiante);
          alert(`¡Presencia registrada!\n${nombreEstudiante} ha sido marcado como presente en la asignatura ${asignatura} - sección ${seccion}.`);
        }
      } else {
        console.log("No se encontraron datos para este estudiante");
        await this.showErrorAlert("No se encontraron datos para este estudiante.");
      }
    } catch (error) {
      console.error("Error al marcar la presencia en Firestore", error);
      await this.showErrorAlert("Error al marcar la presencia.");
    }
  }

  async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['Cerrar']
    });
    await alert.present();
  }

  navigateToHomeAlumno() {
    this.router.navigate(['/home-alumno']);
  }
}
