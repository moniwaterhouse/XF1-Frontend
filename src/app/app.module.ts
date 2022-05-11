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

import {HttpClientModule} from '@angular/common/http';
import { CampeonatosComponent } from './campeonatos/campeonatos.component';
import { CrearCampeonatoComponent } from './crear-campeonato/crear-campeonato.component';
import { FormsModule } from '@angular/forms';
import { CrearCarreraComponent } from './crear-carrera/crear-carrera.component';
import { CarrerasComponent } from './carreras/carreras.component';


@NgModule({
  declarations: [
    AppComponent,
    CampeonatosComponent,
    CrearCampeonatoComponent,
    CrearCarreraComponent,
    CarrerasComponent
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
    FormsModule
    
  ],
  exports:[

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
