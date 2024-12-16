import { AngularFireAuth } from '@angular/fire/compat/auth';
import { inject, Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail} from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc } from '@angular/fire/firestore';
import { collection, getDocs } from '@angular/fire/firestore';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

import { Observable } from 'rxjs';

import { addDoc } from 'firebase/firestore';
import { Asignatura } from 'src/app/models/asignatura.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  asignaturaNames: string[] = []; 


  // Autenticación
  async getUserRole(uid: string): Promise<string | null> {
    const userDoc = await this.firestore.collection('profesores').doc(uid).get().toPromise();
    
    // Verificar si userDoc es undefined o null antes de acceder a sus propiedades
    if (userDoc && userDoc.exists) {
      const userData = userDoc.data() as User;
      return userData.role || null;
    }
    
    return null;
  }
  

  async login(email: string, password: string) {
    const result = await this.auth.signInWithEmailAndPassword(email, password);
    return result;
  }

  // Crear usuario alumno
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Actualizar usuario
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser!, { displayName });
  }

  // Base de datos
  // Setear un documento en la base de datos
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  // Email para reestablecer contraseña
  sendPasswordResetEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  // Obtener el nombre de usuario de "profesores"
  async getUserName(uid: string): Promise<string | null> {
    try {
      const userDoc = await this.firestore.collection('profesores').doc(uid).get().toPromise();
      if (userDoc.exists) {
        const userData = userDoc.data() as { name: string };
        return userData.name || null;
      }
      return null;
    } catch (error) {
      console.error('Error al obtener el nombre del profesor:', error);
      return null;
    }
  }
  
  addAsignatura(asignatura: any) {
    return this.firestore.collection('asignaturas').add(asignatura);
  }
 
  // Obtener el nombre de usuario de "users"
  async getUserNameUsers(uid: string): Promise<string | null> {
    try {
      const userDoc = await this.firestore.collection('users').doc(uid).get().toPromise();
      if (userDoc.exists) {
        const userData = userDoc.data() as { name: string };
        return userData.name || null;
      }
      return null;
    } catch (error) {
      console.error('Error al obtener el nombre del usuario:', error);
      return null;
    }
  }
    // Obtener asignaturas desde Firestore
    async getAsignaturas(): Promise<{ id: string; name: string }[]> {
      try {
        const snapshot = await this.firestore.collection('asignaturas').ref.get();
        const asignaturas: { id: string; name: string }[] = [];
        this.asignaturaNames = []; // Reiniciar el array de nombres de asignaturas
    
        snapshot.forEach((doc) => {
          const asignaturaData = doc.data() as Asignatura;
          console.log('Asignatura data:', asignaturaData); // Verifica los datos aquí
    
          // Usar el campo 'name' para el nombre de la asignatura
          if (asignaturaData && asignaturaData.name) {
            asignaturas.push({
              id: doc.id,
              name: asignaturaData.name, // Acceder al nombre usando 'name'
            });

            // Guardamos solo el nombre de la asignatura en asignaturaNames
            this.asignaturaNames.push(asignaturaData.name);
          } else {
            console.warn('El campo "name" está ausente en la asignatura:', asignaturaData.name);
          }
        });
    
        return asignaturas; // Devolver la lista de asignaturas
      } catch (error) {
        console.error('Error al obtener las asignaturas:', error);
        return [];
      }
    }

    async registrarInscripcion(uid: string, idAsignatura: string, nombreAsignatura: string) {
      try {
        // Crear un documento en la colección 'inscripciones' con los datos de la inscripción
        const inscripcion = {
          uidAlumno: uid,
          idAsignatura: idAsignatura,
          nombreAsignatura: nombreAsignatura,
        };
  
        // Guardar en la base de datos Firestore
        await this.firestore.collection('inscripciones').add(inscripcion);
        console.log('Inscripción registrada con éxito');
      } catch (error) {
        console.error('Error al registrar la inscripción:', error);
      }
    }
    
    async getUserUid(): Promise<string> {
      const currentUser = await this.auth.currentUser;
      if (currentUser) {
        return currentUser.uid;
      } else {
        return ''; // Retorna un string vacío si no hay usuario autenticado
      }
    }


    //para el qr 
    async getAsignaturaById(id: string): Promise<Asignatura | null> {
      try {
        const doc = await this.firestore.collection('asignaturas').doc(id).get().toPromise();
        if (doc.exists) {
          const asignaturaData = doc.data() as Asignatura;
          console.log('Asignatura encontrada:', asignaturaData);
          return asignaturaData;
        } else {
          console.warn('Asignatura no encontrada para el ID:', id);
          return null;
        }
      } catch (error) {
        console.error('Error al obtener la asignatura:', error);
        return null;
      }
    }

    async marcarAsistencia(asignaturaId: string, estudianteId: string) {
      const data = {
        asignaturaId: asignaturaId, // Guardamos el ID de la asignatura
        estudianteId: estudianteId, // Guardamos el ID del estudiante
        fecha: new Date().toISOString(), // Fecha y hora actual
        estado: 'presente', // Estado de la asistencia
      };
    
      try {
        // Guarda los datos de asistencia en Firebase
        await this.firestore.collection('asistencias').add(data);
        return true; // Retorna true si la operación fue exitosa
      } catch (error) {
        console.error('Error al guardar la asistencia:', error);
        return false; // Retorna false si hubo un error
      }
    }
    
  
    // Este método recupera las asistencias desde Firebase
    async getAsistencias() {
      try {
        const asistenciasSnapshot = await this.firestore.collection('asistencias').get().toPromise();
        return asistenciasSnapshot.docs.map(doc => doc.data());
      } catch (error) {
        console.error('Error al obtener las asistencias:', error);
        return [];
      }

}

}

  
    
    
    