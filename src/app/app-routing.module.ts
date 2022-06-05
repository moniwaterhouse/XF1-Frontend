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
import { RankingPublicoComponent } from './ranking-publico/ranking-publico.component';
import { LigaPrivadaComponent } from './liga-privada/liga-privada.component';
import { PerfilJugadorComponent } from './perfil-jugador/perfil-jugador.component';

const routes: Routes = [
  { path: 'crear-campeonato', component: CrearCampeonatoComponent},
  { path: 'campeonatos', component: CampeonatosComponent},
  { path: 'crear-carrera', component: CrearCarrerasComponent},
  { path: 'carreras', component: CarrerasComponent},
  { path: 'registro-jugador', component: RegistroJugadorComponent },
  { path: 'configurar-escuderia', component: ConfigurarEscuderiaComponent },
  { path: 'ranking-publico', component: RankingPublicoComponent },
  { path: 'liga-privada', component: LigaPrivadaComponent },
  { path: 'perfil-jugador', component: PerfilJugadorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
