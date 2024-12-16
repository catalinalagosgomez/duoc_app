import { FirebaseService } from 'src/app/services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; 
import { Asignatura } from 'src/app/models/asignatura.model';

@Component({
  selector: 'app-inscripcion-asignatura',
  templateUrl: './inscripcion-asignatura.page.html',
  styleUrls: ['./inscripcion-asignatura.page.scss']
})export class InscripcionAsignaturaPage implements OnInit {
  
  asignaturas: { id: string; name: string }[] = []; // Lista de asignaturas
  selectedAsignatura: string | null = null; // Almacena la asignatura seleccionada
  asignaturaNames: string[] = [];
  constructor(private firebaseService: FirebaseService, private navCtrl: NavController) {}

  async ngOnInit() {
    // Obtener asignaturas desde Firebase
    this.asignaturas = await this.firebaseService.getAsignaturas();
    // Asignar los nombres de las asignaturas
    this.asignaturaNames = this.firebaseService.asignaturaNames;
    console.log('Nombres de las asignaturas:', this.asignaturaNames);
  }
  onAsignaturaSelect(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
  
    if (selectedId) {
      this.registrarInscripcion(selectedId);
    } else {
      console.error('No se seleccionó ninguna asignatura');
    }
  }
  
  async registrarInscripcion(selectedId: string) {
    try {
      // Cargar las asignaturas si no están disponibles
      if (!this.asignaturas || this.asignaturas.length === 0) {
        this.asignaturas = await this.firebaseService.getAsignaturas();
      }
  
      // Buscar la asignatura seleccionada
      const asignaturaSeleccionada = this.asignaturas.find(a => a.id === selectedId);
  
      if (asignaturaSeleccionada) {
        const uidAlumno = await this.firebaseService.getUserUid();
  
        if (uidAlumno) {
          const idAsignatura = asignaturaSeleccionada.id;
          const nombreAsignatura = asignaturaSeleccionada.name;
  
          // Registrar inscripción
          await this.firebaseService.registrarInscripcion(uidAlumno, idAsignatura, nombreAsignatura);
          console.log(`Inscripción registrada: ${nombreAsignatura}`);
        } else {
          console.error('UID del alumno no encontrado');
        }
      } else {
        console.error('Asignatura seleccionada no encontrada');
      }
    } catch (error) {
      console.error('Error al registrar la inscripción:', error);
    }
  }
  


  // Función }para inscribir una asignatura
  inscribirAsignatura() {
    if (this.selectedAsignatura) {
     
      console.log(`Inscrito en la asignatura con ID: ${this.selectedAsignatura}`);
      // Puedes agregar más lógica aquí, como llamar a un servicio para actualizar la base de datos
    } else {
      console.log('No se ha seleccionado ninguna asignatura.');
    }
  }

  logout() {
    // Lógica adicional para cerrar sesión si es necesario
    this.navCtrl.navigateRoot('/home-alumno');
  }
}


