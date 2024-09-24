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
  alumnosPorSeccion: { [key: string]: any[] } = {
    'PGY_1': [
      { nombre: 'Carlos', presente: false },
      { nombre: 'Ana', presente: false },
      { nombre: 'Irene', presente: false }
    ],
    'PGY_2': [
      { nombre: 'Pedro', presente: false },
      { nombre: 'Lucía', presente: false },
      { nombre: 'Amelie', presente: false }
    ],
    'PGY_3': [
      { nombre: 'Sofía', presente: false },
      { nombre: 'David', presente: false },
      { nombre: 'Valentina', presente: false }
    ],
    'BD_1': [
      { nombre: 'Juan', presente: false },
      { nombre: 'María', presente: false },
      { nombre: 'Noemí', presente: false }
    ],
    'BD_2': [
      { nombre: 'Roberto', presente: false },
      { nombre: 'Claudia', presente: false },
      { nombre: 'Lucas', presente: false }
    ],
    'BD_3': [
      { nombre: 'Jorge', presente: false },
      { nombre: 'Estefanía', presente: false },
      { nombre: 'Joaquin', presente: false }
    ],
    'CAL_1': [
      { nombre: 'Fernando', presente: false },
      { nombre: 'Camila', presente: false },
      { nombre: 'Bryan', presente: false }
    ],
    'CAL_2': [
      { nombre: 'Andrés', presente: false },
      { nombre: 'Valeria', presente: false },
      { nombre: 'Abigail', presente: false }
    ],
    'CAL_3': [
      { nombre: 'Gustavo', presente: false },
      { nombre: 'Elena', presente: false },
      { nombre: 'Benjamin', presente: false }
    ]
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
  
  onSeccionChange() {
    this.alumnos = this.alumnosPorSeccion[this.seccion] || [];
    console.log('Sección seleccionada:', this.seccion);
    console.log('Alumnos:', this.alumnos);
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
