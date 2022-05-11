import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampeonatosComponent } from './campeonatos/campeonatos.component';
import { CrearCampeonatoComponent } from './crear-campeonato/crear-campeonato.component';

const routes: Routes = [
  { path: 'crear-campeonato', component: CrearCampeonatoComponent},
  { path: 'campeonatos', component: CampeonatosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
