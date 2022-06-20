/**
 * Carrera es un componente de angular que permite obtener las carreras existentes y mostrar la información de cada una de ellas en el UI por medio de una tabla.
 * @author Mónica Waterhouse
 * @version V1.0
 */

import { Component, OnInit } from '@angular/core';
import { CarrerasService } from '@app/_services/carreras.service';
import { CampeonatosService } from '@app/_services/campeonatos.service';
import { first } from 'rxjs';
import * as XLSX from 'xlsx';
import { Campeonato } from '../_interfaces/campeonatos';
import { Router } from '@angular/router';
import { AuthGuardService } from '@app/_services/auth-guard.service';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.scss']
})
export class CarrerasComponent implements OnInit {

  carreras: any;

  campeonato:any
  campeonatosExistentes: any;
  campeonatoNombre: string = ""

  formatoIncorrecto: boolean = false
  archivoIncorrecto: boolean = false
  archivoSubido: boolean = false
  resultadosPendientes: boolean = false

  correo !: string;
  
  

  constructor(private carrerasSrv: CarrerasService, private campeonatoSrv: CampeonatosService, private auth : AuthGuardService, private route: Router) { 
    this.auth.correoAux.subscribe((u: string) => { this.correo = u });

    if(this.correo == "" || this.correo == null){
      this.route.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.carrerasSrv.getCarreras().pipe(first()).subscribe(response => { this.carreras = response; });
    this.campeonatoSrv.getCampeonatos().pipe(first()).subscribe(response => { this.campeonatosExistentes = response; });
  }

  selecCampeonato(campeonato: Campeonato) {
    this.campeonatoNombre = campeonato.nombre
    this.resPendientes()
    
  }

  resPendientes() {
    for (let i of this.carreras) {
      if (i.nombreCampeonato == this.campeonatoNombre) {
        if (i.estado == "Calificacion Completada") {
          this.resultadosPendientes = true
        }
      }
    }
  }

  leerArchivo(ev: Event) {
    console.log(this.campeonato)
    this.reiniciarBanderas()
    const file = (<HTMLInputElement>ev.target).files![0]
    const lector = new FileReader()
    if (file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      lector.readAsArrayBuffer(file)
      lector.onload = (e) => {
        const bufferArray = e.target?.result
        const wb: XLSX.WorkBook = XLSX.read(bufferArray, { type: 'buffer' })
        const wsname: string = wb.SheetNames[0]
        const ws: XLSX.WorkSheet = wb.Sheets[wsname]
        const data: JSON[] = XLSX.utils.sheet_to_json(ws, { raw: false })
        if (Object.keys(data[0]).length == 16 && data.length >= 1) {
          this.archivoIncorrecto = false
          this.carrerasSrv.subirResultados(data).pipe(first()).subscribe(response => { this.ngOnInit() })
          console.log(data)
          this.archivoSubido = true
        } else {
          this.archivoIncorrecto = true
        }
      }
    } else {
      this.formatoIncorrecto = true
    }
  }

  reiniciarBanderas() {
    this.formatoIncorrecto = false
    this.archivoSubido = false
    this.archivoIncorrecto = false
  }
}
