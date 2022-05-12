import { Component, OnInit } from '@angular/core';
import { Carrera } from '../_interfaces/carreras'
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
    this.carrerasSrv.getCarreras().pipe(first()).subscribe(response =>
      {this.carreras = response;});
  }

}
