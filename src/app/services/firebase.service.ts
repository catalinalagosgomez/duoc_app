
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { inject, Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail} from 'firebase/auth'
import { User} from '../models/user.model';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc } from '@angular/fire/firestore';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {s

auth = inject(AngularFireAuth);
firestore = inject(AngularFirestore);

//autenticacion
async getUserRole(uid: string): Promise<string | null> {
  const userDoc = await this.firestore.collection('profesores').doc(uid).get().toPromise();
  if (userDoc.exists) {
    const userData = userDoc.data() as User;
    return userData.role || null;
  }
  return null;
}

async login(email: string, password: string) {
  const result = await this.auth.signInWithEmailAndPassword(email, password);
  return result;
}

//crear usuario alumno
signUp(user:User){
  return createUserWithEmailAndPassword(getAuth(), user.email, user.password)
}


// actualizar usuario
updateUser(displayName:string){
  return updateProfile(getAuth().currentUser, {displayName})
  }

// base de datos
//setear un documento en la base de datos
setDocument(path: string, data: any) {
  return setDoc(doc(getFirestore(), path), data);
}

//email para reestablecer contraseña
sendPasswordResetEmail(email: string) {
  return sendPasswordResetEmail(getAuth(), email)
  }
  
  async getUserName(uid: string): Promise<string | null> {
    try {
      const userDoc = await this.firestore.collection('profesores').doc(uid).get().toPromise();
      if (userDoc.exists) {
        const userData = userDoc.data() as { name: string };
        return userData.name || null;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
  

  async getUserNameUsers(uid: string): Promise<string | null> {
    try {
      const userDoc = await this.firestore.collection('users').doc(uid).get().toPromise();
      if (userDoc.exists) {
        const userData = userDoc.data() as { name: string };
        return userData.name || null;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
    
}