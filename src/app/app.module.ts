/**
 * AppModule es el archivo donde se importan todas las dependencias globales que el proyecto requiere para funcionar correctamente
 * @author Mónica Waterhouse
 * @version V1.0
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select'
import { HttpClientModule } from '@angular/common/http';
import { CampeonatosComponent } from './campeonatos/campeonatos.component';
import { CrearCampeonatoComponent } from './crear-campeonato/crear-campeonato.component';
import { FormsModule } from '@angular/forms';
import { CarrerasComponent } from './carreras/carreras.component';
import { CrearCarrerasComponent } from './crear-carreras/crear-carreras.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigurarEscuderiaComponent } from './configurar-escuderia/configurar-escuderia.component';
import { RegistroJugadorComponent } from './registro-jugador/registro-jugador.component';
import { MatIconModule } from "@angular/material/icon";
import { RankingPublicoComponent } from './ranking-publico/ranking-publico.component';
import { LigaPrivadaComponent } from './liga-privada/liga-privada.component';
import { PerfilJugadorComponent } from './perfil-jugador/perfil-jugador.component';


@NgModule({
  declarations: [
    AppComponent,
    CampeonatosComponent,
    CrearCampeonatoComponent,
    CarrerasComponent,
    CrearCarrerasComponent,
    ConfigurarEscuderiaComponent, 
    RegistroJugadorComponent, RankingPublicoComponent, LigaPrivadaComponent, PerfilJugadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    HttpClientModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule
    
  ],
  exports:[

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
