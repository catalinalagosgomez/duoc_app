import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage {
  fecha: string = '';  
  asignatura: string = '';  
  asignaturas: string[] = ['Matemáticas', 'Historia', 'Física'];  
  alumnos: any[] = [    
    { nombre: 'Carlos', presente: false },
    { nombre: 'Ana', presente: false },
    { nombre: 'Beatriz', presente: false }
  ];

  constructor(private alertController: AlertController, private router: Router) {}

  // Método que se ejecuta cuando se hace clic en el botón "Listo"
  async confirmar() {
    const alert = await this.alertController.create({
      header: '¿Estás seguro?',
      message: '¿Es correcta la información de asistencia?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            // Si elige "No", lo rediriges a la página de asistencia
            this.router.navigate(['/asistencia']);
          }
        },
        {
          text: 'Sí',
          handler: async () => {
            // Si elige "Sí", muestra otra alerta de confirmación
            const successAlert = await this.alertController.create({
              header: 'Todo está listo',
              message: 'La asistencia ha sido registrada. Puede volver al inicio.',
              buttons: [
                {
                  text: 'OK',
                  handler: () => {
                    // Redirigir al inicio
                    this.router.navigate(['/home']);
                  }
                }
              ]
            });
            await successAlert.present();
          }
        }
      ]
    });

    await alert.present();
  }
}
