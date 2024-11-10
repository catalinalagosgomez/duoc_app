import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importamos AngularFirestore para Firestore
import { Geolocation } from '@capacitor/geolocation'; // Importamos Geolocation desde Capacitor
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
    private geolocation: Geolocation, // Inyectamos el servicio de geolocalización de Capacitor
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
      // Verificamos si el usuario está en la ubicación permitida
      const isLocationValid = await this.checkLocation();
      if (!isLocationValid) {
        await this.showErrorAlert("No está en la ubicación permitida para escanear el código QR.");
        return;
      }

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

  // Función para comprobar la ubicación del usuario
  private async checkLocation(): Promise<boolean> {
    if (this.platform.is('mobile')) {
      // Usamos Geolocation.getCurrentPosition() desde Capacitor en dispositivos móviles
      try {
        const position = await Geolocation.getCurrentPosition();
        const latitud = position.coords.latitude;
        const longitud = position.coords.longitude;

        // Coordenadas aproximadas de Duoc UC Concepción (cambia según la ubicación exacta)
        const latitudPermitida = -36.8275;
        const longitudPermitida = -73.0496;

        const distancia = this.calculateDistance(latitud, longitud, latitudPermitida, longitudPermitida);

        // Si la distancia es menor a un umbral (por ejemplo, 100 metros), consideramos que está en la ubicación correcta
        return distancia <= 0.1; // 0.1 km = 100 metros
      } catch (error) {
        console.error('Error al obtener la ubicación:', error);
        return false; // Si no se puede obtener la ubicación, no permitimos el escaneo
      }
    } else {
      // Usamos el navegador para obtener la geolocalización en plataformas web
      return new Promise<boolean>((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const latitud = position.coords.latitude;
              const longitud = position.coords.longitude;

              // Coordenadas aproximadas de Duoc UC Concepción (cambia según la ubicación exacta)
              const latitudPermitida = -36.8275;
              const longitudPermitida = -73.0496;

              const distancia = this.calculateDistance(latitud, longitud, latitudPermitida, longitudPermitida);

              // Si la distancia es menor a un umbral (por ejemplo, 100 metros), consideramos que está en la ubicación correcta
              resolve(distancia <= 0.1);
            },
            (error) => {
              console.error('Error al obtener la ubicación del navegador:', error);
              reject(false);
            }
          );
        } else {
          reject(false); // Si el navegador no soporta geolocalización
        }
      });
    }
  }

  // Función para calcular la distancia entre dos coordenadas (en kilómetros)
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.degreesToRadians(lat1)) * Math.cos(this.degreesToRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distancia en km
  }

  // Función para convertir grados a radianes
  private degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
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

  // Función para mostrar alertas de error
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
