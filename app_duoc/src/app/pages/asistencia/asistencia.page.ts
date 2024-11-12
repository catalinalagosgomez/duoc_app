import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
  profesor: string | null = null;
  asignaturas: string[] = ['Programacion', 'Base de datos', 'Calidad'];  
  seccionesDisponibles: string[] = [];  
  alumnos: any[] = [];  
  asistentesQR: any[] = [];  
  claseActiva: boolean = false;
  qrId: string | null = null;

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private alertController: AlertController,
    private router: Router
  ) {
    this.auth.user.subscribe(user => {
      this.profesor = user?.displayName || user?.email || null;
    });
  }

  onAsignaturaChange() {
    const seccionesPorAsignatura = {
      'Programacion': ['PGY_1', 'PGY_2', 'PGY_3'],
      'Base de datos': ['BD_1', 'BD_2', 'BD_3'],
      'Calidad': ['CAL_1', 'CAL_2', 'CAL_3']
    };
    this.seccionesDisponibles = seccionesPorAsignatura[this.asignatura] || [];
    this.seccion = '';
    this.alumnos = []; 
    this.claseActiva = false;
    this.asistentesQR = [];
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
            await this.guardarAsistencia();
            const successAlert = await this.alertController.create({
              header: 'Todo está listo',
              message: 'La asistencia ha sido registrada. Puede volver al inicio.',
              buttons: [{ text: 'OK', handler: () => this.router.navigate(['/home']) }]
            });
            await successAlert.present();
          }
        }
      ]
    });
    await alert.present();
  }

  onSeccionChange() {
    this.verificarClaseActiva();
  }

  verificarClaseActiva() {
    this.firestore
      .collection('codigoQR', ref =>
        ref.where('asignatura', '==', this.asignatura)
          .where('seccion', '==', this.seccion)
      )
      .valueChanges()
      .subscribe((clases: any[]) => {
        if (clases.length > 0) {
          this.claseActiva = true;
          this.qrId = clases[0].identificacion;
          this.asistentesQR = clases.map(clase => ({
            ...clase,
            fechaHoraChile: new Date(clase.timestamp).toLocaleString('es-CL', { timeZone: 'America/Santiago' })
          }));
          this.obtenerAlumnos(this.qrId);
        } else {
          this.claseActiva = false;
          this.asistentesQR = [];
        }
      }, error => {
        console.error("Error al verificar clase activa:", error);
      });
  }

  obtenerAlumnos(qrId: string) {
    this.firestore
      .collection('asistencia', ref => ref.where('qrId', '==', qrId))
      .valueChanges()
      .subscribe((alumnos: any[]) => {
        this.alumnos = alumnos;
      }, error => {
        console.error("Error al obtener alumnos:", error);
      });
  }

  async guardarAsistencia() {
    if (!this.qrId) {
      console.error("No se encontró QR ID para la clase activa.");
      return;
    }

    const alumnosPresentes = this.alumnos.filter(alumno => alumno.presente);
    
    for (const alumno of alumnosPresentes) {
      try {
        // Configuración de fecha y hora para Chile
        const chileDate = new Date();
        const chileOptions: Intl.DateTimeFormatOptions = { 
          timeZone: 'America/Santiago', 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit' 
        };
        const horaChile = chileDate.toLocaleTimeString('es-CL', chileOptions);
        const fechaChile = chileDate.toLocaleDateString('es-CL');

        // Guardar en Firestore
        await this.firestore.collection('asistencia').add({
          qrId: this.qrId,
          alumno: alumno.nombre,
          correo: alumno.correo,
          asignatura: this.asignatura,
          seccion: this.seccion,
          profesor: this.profesor,
          fecha: fechaChile,
          hora: horaChile
        });
        console.log(`Asistencia guardada para ${alumno.nombre}`);
      } catch (error) {
        console.error(`Error al guardar asistencia de ${alumno.nombre}`, error);
      }
    }
  }
}
