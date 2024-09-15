import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(private navCtrl: NavController) {}

  // Método para navegar a diferentes páginas
  navigateTo(page: string) {
    this.navCtrl.navigateForward(`/${page}`);
  }

  // Método para cerrar sesión
  logout() {
    console.log("Cerrando sesión...");
    this.navCtrl.navigateRoot('/login'); // Regresa a la página de login
  }

}
