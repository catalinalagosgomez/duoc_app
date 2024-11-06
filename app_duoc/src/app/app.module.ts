import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';

// Firebase




@NgModule({
  declarations: [
    AppComponent
    // HistorialAsistenciaPage se elimina de aquí
  ],
  imports: [BrowserModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    IonicModule.forRoot(),
    AppRoutingModule],

  providers: [{
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
