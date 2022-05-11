import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampeonatosComponent } from './campeonatos/campeonatos.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { CrearCampeonatoComponent } from './crear-campeonato/crear-campeonato.component';
import { CrearCarreraComponent } from './crear-carrera/crear-carrera.component';

const routes: Routes = [
  { path: 'crear-campeonato', component: CrearCampeonatoComponent},
  { path: 'campeonatos', component: CampeonatosComponent},
  { path: 'crear-carrera', component: CrearCarreraComponent},
  { path: 'carreras', component: CarrerasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
