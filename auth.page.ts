import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });



  firebaseSvc= inject(FirebaseService);
  utilsSvc= inject(UtilsService);   
  
  ngOnInit() {
  }
  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      // Verificar si es el correo de admin
      if (this.form.value.email === 'admin@duocuc.cl' && this.form.value.password === 'admin123') {
        this.utilsSvc.saveInLocalStorage('user', this.form.value);
        this.utilsSvc.routerLink('/main');
        this.form.reset();
      } else {
        // Si no es admin, continuar con el flujo normal
        this.firebaseSvc.signIn(this.form.value as User).then(res => {
          this.utilsSvc.saveInLocalStorage('user', this.form.value);
          this.utilsSvc.routerLink('/home-alumno');
          this.form.reset();
          console.log(res);
        }).catch(error => {
          console.log(error);
          this.utilsSvc.presentToast({
            message: error.message,
            duration: 2500,
            color: 'danger', 
            icon: 'close-circle-outline'
          });
        });
      }
      loading.dismiss();
    }
  }
}
