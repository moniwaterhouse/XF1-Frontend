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

const routes: Routes = [
  { path: 'crear-campeonato', component: CrearCampeonatoComponent},
  { path: 'campeonatos', component: CampeonatosComponent},
  { path: 'crear-carrera', component: CrearCarrerasComponent},
  { path: 'carreras', component: CarrerasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
