import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, doc, setDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  constructor(private firestore: Firestore) {}

  // Obtener todas las asignaturas
  obtenerAsignaturas(): Observable<any[]> {
    const asignaturasCollection = collection(this.firestore, 'asignaturas'); // Referencia a la colección
    const asignaturasPromise = getDocs(asignaturasCollection).then(snapshot => {
      const asignaturas: any[] = [];
      snapshot.forEach(doc => asignaturas.push({ id: doc.id, ...doc.data() })); // Construir array de documentos
      return asignaturas;
    });
    return from(asignaturasPromise); // Convertir Promise a Observable
  }

  // Inscribir al alumno en las asignaturas seleccionadas
  inscribirAlumno(alumnoId: string, asignaturas: string[]): Promise<void> {
    const inscripcionRef = doc(this.firestore, 'inscripciones', alumnoId); // Referencia al documento
    return setDoc(inscripcionRef, {
      alumnoId: alumnoId,
      asignaturas: asignaturas
    });
  }
}
