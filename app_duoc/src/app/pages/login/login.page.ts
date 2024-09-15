import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  userType: 'profesor' | 'alumno' = 'profesor'; // Valor por defecto

  constructor(private navCtrl: NavController, private toastController: ToastController) {}

  async onSubmit() {
    const validCredentials = {
      profesor: { email: 'profesor@duocuc.cl', password: 'password123' },
      alumno: { email: 'alumno@duocuc.cl', password: 'password123' }
    };

    const credentials = validCredentials[this.userType];

    if (this.email === credentials.email && this.password === credentials.password) {
      console.log('Inicio de sesión exitoso');
      
      // Navegar a la página correspondiente según el tipo de usuario
      if (this.userType === 'profesor') {
        this.navCtrl.navigateRoot('/home');  // Navegar a la página principal para profesores
      } else if (this.userType === 'alumno') {
        this.navCtrl.navigateRoot('/home-alumno');  // Navegar a la página principal para alumnos
      }

    } else {
      console.log('Credenciales incorrectas');
      const toast = await this.toastController.create({
        message: 'Credenciales incorrectas. Por favor, intente de nuevo.',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }
}
