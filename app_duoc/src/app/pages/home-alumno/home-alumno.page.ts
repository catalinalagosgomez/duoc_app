import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home-alumno',
  templateUrl: './home-alumno.page.html',
  styleUrls: ['./home-alumno.page.scss'],
})
export class HomeAlumnoPage {

  constructor(private navCtrl: NavController, private toastController: ToastController) {}

  async navigateTo(page: string) {
    this.navCtrl.navigateForward(`/${page}`);
  }

  async logout() {
    // Aquí puedes agregar la lógica para cerrar sesión
    console.log('Cerrar sesión');
    // Redirigir a la página de inicio de sesión o principal
    this.navCtrl.navigateRoot('/login');
  }
}
