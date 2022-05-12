/**
 * Carrera es un componente de angular que permite obtener las carreras existentes y mostrar la información de cada una de ellas en el UI por medio de una tabla.
 * @author Mónica Waterhouse
 * @version V1.0
 */

import { Component, OnInit } from '@angular/core';
import { CarrerasService } from '@app/_services/carreras.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.scss']
})
export class CarrerasComponent implements OnInit {

  carreras : any;

  constructor(private carrerasSrv : CarrerasService) { }

  ngOnInit(): void {
    this.carrerasSrv.getCarreras().pipe(first()).subscribe(response => {this.carreras = response;});
  }

}
