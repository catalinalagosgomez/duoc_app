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
  seccion: string = '';  
  asignaturas: string[] = ['Programacion', 'Base de datos', 'Calidad'];  
  secciones: { [key: string]: string[] } = {
    'Programacion': ['PGY_1', 'PGY_2', 'PGY_3'],
    'Base de datos': ['BD_1', 'BD_2', 'BD_3'],
    'Calidad': ['CAL_1', 'CAL_2', 'CAL_3']
  };  
  
  alumnos: any[] = [];  
  mostrarCalendario: boolean = false;  
  seccionesDisponibles: string[] = [];  

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

  onAsignaturaChange() {
    this.seccionesDisponibles = this.secciones[this.asignatura] || [];
    this.seccion = '';
    this.alumnos = []; 
    console.log('Asignatura seleccionada:', this.asignatura);
    console.log('Secciones disponibles:', this.seccionesDisponibles);
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
