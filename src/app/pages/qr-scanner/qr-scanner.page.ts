import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Asignatura } from 'src/app/models/asignatura.model';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage implements OnInit {
  isReadyToScan: boolean = false;
  isSupported = false;
  asignaturas: { id: string; name: string }[] = []; // Lista de asignaturas
  selectedAsignatura: string | null = null; // Almacena la asignatura seleccionada
  asignaturaNames: string[] = []; // Lista de nombres de asignaturas
  qrData: string | null = null;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private firebaseService: FirebaseService,
  ) {}

  private asignaturasMap: Map<string, string> = new Map();

  async ngOnInit() {
    this.asignaturas = await this.firebaseService.getAsignaturas();
    this.asignaturas.forEach(asignatura => {
      this.asignaturasMap.set(asignatura.id, asignatura.name);
    });
  }
  

  async onAsignaturaSelect() {
    const asignaturaId = [...this.asignaturasMap.entries()]
      .find(([, name]) => name === this.selectedAsignatura)?.[0];
    if (asignaturaId) {
      this.updateIsReadyToScan();
      await this.startScan(asignaturaId);
    }
  }
  

  isScanning: boolean = false;

  async startScan(asignaturaId: string) {
    this.isScanning = true;
    try {
      const granted = await this.requestPermissions();
      if (!granted) {
        await this.showPermissionAlert();
        return;
      }

      const { barcodes } = await BarcodeScanner.scan();
      if (barcodes.length > 0) {
        this.qrData = barcodes[0].rawValue;
        console.log('Código QR escaneado:', this.qrData);

        // Lógica para marcar la asistencia
        const resultado = await this.firebaseService.marcarAsistencia(
          asignaturaId,
          this.qrData
        );

        if (resultado) {
          await this.showSuccessAlert('Asistencia marcada correctamente.');
          
          // Redirigir a la página de Asistencia y pasar el estado de la asistencia
          this.router.navigate(['/asistencia'], {
            queryParams: { mensaje: 'Asistencia marcada correctamente en la clase correspondiente.' },
          });
        } else {
          await this.showErrorAlert(
            'No se pudo marcar la asistencia. Verifique el código QR.'
          );
        }
      } else {
        console.log('Escaneo cancelado o sin datos.');
      }
    } catch (error) {
      console.error('Error durante el escaneo:', error);
      await this.showErrorAlert('Error durante el escaneo.');
    } finally {
      this.isScanning = false;
    }
  }

  // Método para mostrar alerta de éxito
  async showSuccessAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: message,
      buttons: ['Cerrar'],
    });
    await alert.present();
  }

  // Métodos para permisos y alertas
  private async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['Cerrar']
    });
    await alert.present();
  }

  async showPermissionAlert() {
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message: 'Para usar la aplicación, autorice los permisos de cámara.',
      buttons: ['OK']
    });
    await alert.present();
  }

  // Actualizar el estado de 'isReadyToScan' cuando se seleccione una asignatura
  updateIsReadyToScan() {
    this.isReadyToScan = !!this.selectedAsignatura; // Si se selecciona una asignatura, se habilita el escaneo
  }
}
