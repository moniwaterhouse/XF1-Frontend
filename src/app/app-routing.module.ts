/**
 * AppRoutingModule sirve para cargar y configurar las rutas de cada una de las páginas.
 * @author Mónica Waterhouse
 * @version V1.0
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampeonatosComponent } from './campeonatos/campeonatos.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { CrearCampeonatoComponent } from './crear-campeonato/crear-campeonato.component';
import { CrearCarrerasComponent } from './crear-carreras/crear-carreras.component';
import { RegistroJugadorComponent } from './registro-jugador/registro-jugador.component';
import { ConfigurarEscuderiaComponent } from './configurar-escuderia/configurar-escuderia.component';

const routes: Routes = [
  { path: 'crear-campeonato', component: CrearCampeonatoComponent},
  { path: 'campeonatos', component: CampeonatosComponent},
  { path: 'crear-carrera', component: CrearCarrerasComponent},
  { path: 'carreras', component: CarrerasComponent},
  { path: 'registro-jugador', component: RegistroJugadorComponent }
  { path: 'configurar-escuderia', component: ConfigurarEscuderiaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
