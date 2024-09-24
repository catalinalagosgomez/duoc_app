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
  asignaturas: string[] = ['Programacion', 'Base de Datos', 'Calidad'];  
  alumnos: any[] = [    
    { nombre: 'Carlos', presente: false },
    { nombre: 'Ana', presente: false },
    { nombre: 'Beatriz', presente: false }
  ];

  mostrarCalendario: boolean = false;  

  constructor(private alertController: AlertController, private router: Router) {

    this.setFechaActual();
  }

  setFechaActual() {
    const today = new Date().toISOString();
    this.fecha = today;  
  }


  abrirFecha() {
    this.mostrarCalendario = true;
  }


  cerrarFecha() {
    this.mostrarCalendario = false;
  }


  async confirmar() {
    const alert = await this.alertController.create({
      header: '¿Estás seguro?',
      message: '¿Es correcta la información de asistencia?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['/asistencia']);
          }
        },
        {
          text: 'Sí',
          handler: async () => {
            const successAlert = await this.alertController.create({
              header: 'Todo está listo',
              message: 'La asistencia ha sido registrada. Puede volver al inicio.',
              buttons: [
                {
                  text: 'OK',
                  handler: () => {
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
