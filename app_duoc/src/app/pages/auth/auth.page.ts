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

      if (this.form.value.email === 'admin@duocuc.cl' && this.form.value.password === 'admin123') {
        this.utilsSvc.saveInLocalStorage('user', this.form.value);
        this.utilsSvc.routerLink('/main');
        this.form.reset();
      } else {
        this.login();
      }
    }
  }
  async login() {
    try {
        const res = await this.firebaseSvc.login(this.form.value.email, this.form.value.password);
      const uid = res.user?.uid;
      if (uid) {
              const role = await this.firebaseSvc.getUserRole(uid);
              if (role === 'profesor') {
                  this.utilsSvc.routerLink('/home');  
              } else {
                this.utilsSvc.routerLink('/home-alumno');  
              }
            }
          } catch (error) {
          }
  } 
}
  