import { inject, Injectable } from '@angular/core';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
 loadingCtrl= inject(LoadingController);
 toastCtrl=inject(ToastController)
  
 loading(){
  return this.loadingCtrl.create({
    spinner: 'crescent'
  });
 }


 //toast

 async presentToast(opts?:ToastOptions){
  const Toast= await this.toastCtrl.create(opts);
  Toast.present();
 }
}        
