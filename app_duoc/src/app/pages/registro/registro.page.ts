import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  alumno = {
    nombre: '',
    apellido: '',
    rut: '',
    correo: '',
    password: ''
  };

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private alertController: AlertController
  ) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  async onSubmit() {
    try {
      await this.storage.set(`user_${this.alumno.rut}`, {
        ...this.alumno,
        tipo: 'alumno'
      });
      
      await this.presentAlert('Éxito', 'Usuario registrado correctamente');
      this.navCtrl.navigateRoot('/login');
    } catch (error) {
      await this.presentAlert('Error', 'Error al registrar usuario');
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}