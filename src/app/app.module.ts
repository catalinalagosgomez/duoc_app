import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { environment } from 'src/environments/environment';

// Importación del BarcodeScanner
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
@NgModule({
  declarations: [
    AppComponent
   
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig), 
    AngularFireDatabaseModule,  
    AppRoutingModule,
  ],
  providers: [
    BarcodeScanner,  // Asegúrate de incluir BarcodeScanner aquí
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
