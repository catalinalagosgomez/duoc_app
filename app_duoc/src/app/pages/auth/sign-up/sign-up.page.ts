import { Component, inject, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    role: new FormControl('', [Validators.required]) 
  });
  
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {}

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      const role = this.form.value.role;  // Obtenemos el rol del formulario

      if (role === 'profesor') {
        // Si el rol es profesor, usamos el método signUpProfesor
        this.firebaseSvc.signUp(this.form.value as User).then(async res => {
          await this.firebaseSvc.updateUser(this.form.value.name);
          const uid = res.user.uid;
          this.form.controls.uid.setValue(uid);
          this.setProfesorInfo(uid, 'profesores'); // Guardamos en la colección profesores
        }).catch(error => {
       
        }).finally(() => {
          loading.dismiss();
        });
      } else {
        // Si el rol es usuario (alumno), usamos el método signUp
        this.firebaseSvc.signUp(this.form.value as User).then(async res => {
          await this.firebaseSvc.updateUser(this.form.value.name);
          const uid = res.user.uid;
          this.form.controls.uid.setValue(uid);
          this.setUserInfo(uid, 'users'); // Guardamos en la colección users
        }).catch(error => {

        }).finally(() => {
          loading.dismiss();
        });
      }
    }
  }

  async setUserInfo(uid: string, collection: string) {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      const path = `${collection}/${uid}`;
      const formData = { ...this.form.value };
      delete formData.password; // Eliminamos la contraseña para no guardarla en Firestore

      this.firebaseSvc.setDocument(path, formData).then(async () => {
        this.utilsSvc.saveInLocalStorage('user', formData);
        this.utilsSvc.routerLink('/main'); // Redirecciona al dashboard o página principal
        this.form.reset();
      }).catch(error => {
      }).finally(() => {
        loading.dismiss();
      });
    }
  }

  async setProfesorInfo(uid: string, collection: string) {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      const path = `${collection}/${uid}`;
      const formData = { ...this.form.value };
      delete formData.password; 

      this.firebaseSvc.setDocument(path, formData).then(async () => {
        this.utilsSvc.saveInLocalStorage('user', formData);
        this.utilsSvc.routerLink('/main'); 
        this.form.reset();
      }).catch(error => {
      }).finally(() => {
        loading.dismiss();
      });
    }
  }
  
  }
