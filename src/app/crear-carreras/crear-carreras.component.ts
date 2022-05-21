/**
 * CrearCarrera es un companente que proporciona en el UI un formulario para la creación de las carreras. Utiliza diferentes banderas para poder verificar
 * que los campos requeridos estén completados y que se cumpla con el mínimo de caracteres de los campos que así lo ameritan. Además, proporciona la lógica para
 * evitar que los usuarios selecciones fechas anteriores a la actual, así como lógica para que la fecha de fin sea posterior a la fecha de inicio y para estas. Además,
 * permite al usuario cancelar la creación del formulario de creacion de carrera en caso de que lo requiera.
 * 
 * @author Mónica Waterhouse
 * @version V1.0
 * 
 */

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Carrera } from '@app/_interfaces/carreras';
import { CarrerasService } from '@app/_services/carreras.service';
import { first } from 'rxjs';
import { CampeonatosService } from '@app/_services/campeonatos.service';
import { Router } from '@angular/router';
import { PAISES } from '../_data/paises';

@Component({
  selector: 'app-crear-carreras',
  templateUrl: './crear-carreras.component.html',
  styleUrls: ['./crear-carreras.component.scss']
})


export class CrearCarrerasComponent implements OnInit {

   // Declaración de variables para la asignacion de los valores de los inputs
  nombre!: string;
  campeonato!: any;
  pais!: string;
  pista!: string;
  fechaInicio!: Date;
  horaInicio!: number;
  minInicio!: number;
  fechaFin!: Date;
  horaFin!: number;
  minFin!: number;
  tiempoInicio!: string;
  tiempoFin!: string;

  // Declaración de banderas para validaciones del UI
  missingName !: boolean;
  missingCampeonato !: boolean;
  missingPais !: boolean;
  missingPista !: boolean;
  missingFechaInicio !: boolean;
  missingFechaFin !: boolean;
  missingHoraInicio !: boolean;
  missingMinInicio !: boolean;
  missingHoraFin !: boolean;
  missingMinFin !: boolean;
  missingMessage !: boolean;
  errorMinNombre !: boolean;
  errorMinPista !: boolean;
  campeonatoSeleccionado !: boolean;
  idCampeonato !: any;

  // Declaracion de variables relacionadas la validacion de fechas y formato de fechas
  formatoFechaInicio : any;
  formatoFechaFin : any;
  fechaMin!: Date;
  fechaMax!: Date;
  fechasCampeonato : any;
  fechasOcupadas = new Array();
  fechasCarrerasCreadss !: any;
  filtroFechas !: any;
  
  // Este grupo de variables de tipo Array son utilizadas como insumo de los dropdowns.
  opcionesHora = new Array(25).fill(0).map((x, i)=> i);
  opcionesMinutos = new Array(61).fill(0).map((x, i)=> i);
  

  campeonatosExistentes : any; // Variable para utilizar como insumo en el dropdown of 
  
  carrera!: Carrera; // Variable que va a ser posteriormente utilizada como body para realizar el post request de una carrera

  // Variable para ser utilizada como insumo del dropdown de países
  listaPaises = PAISES;


  constructor(private carreraSrv:CarrerasService, private campeonatoSrv:CampeonatosService, private route : Router) {
    this.campeonatoSeleccionado = false;
  
   }

  ngOnInit(): void {
    this.campeonatoSrv.getCampeonatos().pipe(first()).subscribe(response =>
      {this.campeonatosExistentes = response;});
    

  }

   /**
   * <p> Este método permite verificar que todos los espacios requeridos estén completados y que el espacio 
   * de nombre contenga la cantidad mínima de caracteres requerida. Si las validaciones pasan, se transforman
   * las fechas ingresadas al formato requerido por la base de datos (YYYY-MM-dd) y se hace un llamado al método
   * crearCarrera()</p>
   *  
   */
  validarCamposRequeridos(){
    this.restaurarBanderas();

    if(this.nombre == null || this.nombre.length < 5){
      this.missingName = true;
      this.missingMessage = true;
    }
    if(this.pais == null){
      this.missingPais = true;
      this.missingMessage = true;
    }
    if(this.pista == null || this.pista.length < 5){
      this.missingPista = true;
      this.missingMessage = true;
    }
    if(this.campeonato == null){
      this.missingCampeonato = true;
      this.missingMessage = true;
    }
    if(this.fechaInicio == null){
      this.missingFechaInicio = true;
      this.missingMessage = true;
    }
    if(this.horaInicio == null){
      this.missingHoraInicio = true;
      this.missingMessage = true;
    }
    if(this.minInicio == null){
      this.missingMinInicio = true;
      this.missingMessage = true;
    }
    if(this.fechaFin == null){
      this.missingFechaFin = true;
      this.missingMessage = true;
    }
    if(this.horaFin == null){
      this.missingHoraFin = true;
      this.missingMessage = true;
    }
    if(this.minFin == null){
      this.missingMinFin = true;
      this.missingMessage = true;
    }
   
    if(!this.missingMessage){

      
      this.tiempoInicio = this.horaInicio.toString()+":"+this.minInicio.toString();
      this.tiempoFin = this.horaFin.toString()+":"+this.minFin.toString();
      const datepipe: DatePipe = new DatePipe('en-US');
      this.formatoFechaInicio = datepipe.transform(this.fechaInicio, 'YYYY-MM-dd');
      this.formatoFechaFin = datepipe.transform(this.fechaFin, 'YYYY-MM-dd');
      console.log(this.formatoFechaInicio);
      console.log(this.formatoFechaFin);
      this.crearCarrera();
    }    
  }


  /**
   * <p> Este método asigna los valores correspondientes a cada uno de los atributos de la variable carrera de acuerdo
   * a lo ingresado por el usuario en los inputs y posteriormente esta se pasa como parámtro al método de crearCarrera del servicio de 
   * Carreras para hacer el post de este registro en la tabla Carrera en la base de datos. Cuando termina, hace un rerouting a la
   * página de visualización de las carreras</p>
   *  
   */
  crearCarrera(){
    this.carrera = 
      {nombre: this.nombre, idCampeonato: this.campeonato.id, nombrePais: this.pais, nombrePista: this.pista, fechaInicio: this.formatoFechaInicio, horaInicio: this.tiempoInicio, fechaFin: this.formatoFechaFin, horaFin: this.tiempoFin};
    
    this.carreraSrv.crearCarrera(this.carrera).pipe(first()).subscribe();

    location.href = "http://localhost:4200/carreras"
    
  }

  /**
   * <p> Este método hace un rerouting a la página de visualizacion de los carrerass cuando el usuario quiere cancelar la 
   * creación de una nueva carrera</p>
   *  
   */
  cancelar(){
    this.route.navigate(['/carreras']);
  }

  /**
   * <p> Restaura las banderas al valor original que tenían antes de hacer las validaciones </p>
   */
  restaurarBanderas(){
    this.missingName = false;

  this.missingCampeonato = false;
  this.missingPais = false;
  this.missingPista = false;
  this.missingFechaInicio = false;
  this.missingFechaFin = false;
  this.missingHoraInicio = false;
  this.missingMinInicio = false;
  this.missingHoraFin = false;
  this.missingMinFin = false;

  this.missingMessage = false;

  this.errorMinNombre = false;
  this.errorMinPista = false;
  }

  /**
   *<p> Este método permite que se muestren los inputs de fechas y horas (de inicio y fin) una vez
   que un campeonato se seleccione del dropdown y se deshabilitan las fechas que no están dentro de ese 
   campeonato para qe no puedan ser seleccionadas. </p>
   */
  onCampeonatoSeleccionado(){
    this.campeonatoSeleccionado = true;
    this.fechaMin = this.campeonato.fechaInicio;
    this.fechaMax = this.campeonato.fechaFin;
    this.idCampeonato = this.campeonato.id;
    this.carreraSrv.getFechasUtilizadas(this.idCampeonato).pipe(first()).subscribe(response =>
      {this.fechasCarrerasCreadss = response;
        this.getFechasNoDisponibles(this.fechasCarrerasCreadss);
      });
      this.filtroFechas = (d: Date): boolean => {
        let time=d.getTime();
        return !this.fechasOcupadas.find(x=>x.getTime()==time)
      }
    
      
  }

  /**
   * <p> Llama al servicio de carreras para obtener las fechas de las carreras ya existentes en un campeonato para 
   * que estas no puedan ser seleccionadas al momento de crear un nuevo campeonato </p>
   * @param fechas es un json con la lista de las fechas de inicio y fin de cada uno de los campeonatos
   */
   getFechasNoDisponibles(fechas : any){
    var auxFechas = new Array();
    
    for(let fecha of fechas){
      auxFechas = this.crearListaFechas(fecha.fechaInicio, fecha.fechaFin);
      this.fechasOcupadas = this.fechasOcupadas.concat(auxFechas);
      
    }
  }

   /**
   * <p> Crea una lista de fechas tomando a partir de una fecha de inicio y una fecha final </p>
   * @param incio es la fecha de inicio de la lista
   * @param fin es la fecha final de la lista
   */
  crearListaFechas = function(inicio: any, fin: any) {
    var arr = new Array();
    var dt = new Date(inicio);
    var endDt = new Date(fin);
    while (dt <= endDt) {
        arr.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
    }
    return arr;
}

}
