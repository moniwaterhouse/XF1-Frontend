/**
 * CrearCampeonato es un companente que proporciona en el UI un formulario para la creación de los campeonatos. Utiliza diferentes banderas para poder verificar
 * que los campos requeridos estén completados y que se cumpla con el mínimo de caracteres de los campos que así lo ameritan. Además, proporciona la lógica para
 * evitar que los usuarios selecciones fechas anteriores a la actual, así como lógica para que la fecha de fin sea posterior a la fecha de inicio y para estas. Además,
 * permite al usuario cancelar la creación del formulario en caso de que lo requiera.
 * 
 * @author Mónica Waterhouse
 * @version V1.0
 * 
 */

import { Component, OnInit } from '@angular/core';
import { CampeonatosService } from '@app/_services/campeonatos.service';
import { first, range } from 'rxjs';
import { DatePipe } from '@angular/common'
import { Campeonato} from '../_interfaces/campeonatos'
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-campeonato',
  templateUrl: './crear-campeonato.component.html',
  styleUrls: ['./crear-campeonato.component.scss']
})
export class CrearCampeonatoComponent implements OnInit {

  // Declaración de variables para la asignacion de los valores de los inputs
  id!: string;
  nombre!: string;
  presupuesto!: number;
  fechaInicio!: Date;
  horaInicio!: number;
  minInicio!: number;
  fechaFin!: Date;
  horaFin!: number;
  minFin!: number;
  reglasPuntuacion!: string;
  tiempoInicio!: string;
  tiempoFin!: string;

    // Declaración de banderas para validaciones del UI
  missingName!: boolean;
  missingPresupuesto!: boolean;
  missingFechaInicio!: boolean;
  missingFechaFin!: boolean;
  missingHoraInicio!: boolean;
  missingMinInicio!: boolean;
  missingHoraFin!: boolean;
  missingMinFin!: boolean;
  missingMessage !: boolean;

  // Declaracion de variables relacionadas la validacion de fechas y formato de fechas
  formatoFechaInicio : any;
  formatoFechaFin : any;
  fechaMin!: Date;
  fechaMax!: Date;
  fechasOcupadas = new Array();
  fechasCampeonatosCreados !: any;
  filtroFechas !: any;

  campeonato!: Campeonato;
  
  // Este grupo de variables de tipo Array son utilizadas como insumo de los dropdowns.
  opcionesPresupuesto = new Array(101).fill(0).map((x, i)=> i);
  opcionesHora = new Array(25).fill(0).map((x, i)=> i);
  opcionesMinutos = new Array(61).fill(0).map((x, i)=> i);
  
  
  constructor(private campeonatoSrv: CampeonatosService, private route : Router) { }

  ngOnInit(): void {
    this.fechaMin = new Date();
    this.opcionesPresupuesto.shift();

    this.campeonatoSrv.getFechasUtilizadas().pipe(first()).subscribe(response =>
      {this.fechasCampeonatosCreados = response;
        this.getFechasNoDisponibles(this.fechasCampeonatosCreados);
      });
      this.filtroFechas = (d: Date): boolean => {
        let time=d.getTime();
        return !this.fechasOcupadas.find(x=>x.getTime()==time)
      }
    
      
    
  }

  /**
   * <p> Este método permite verificar que todos los espacios requeridos estén completados y que el espacio 
   * de nombre contenga la cantidad mínima de caracteres requerida. Si las validaciones pasan, se transforman
   * las fechas ingresadas al formato requerido por la base de datos (YYYY-MM-dd) y se hace un llamado al método
   * crearCampeonato()</p>
   *  
   */
  validarCamposRequeridos(){
    this.restaurarBanderas();
    if(this.nombre == null || this.nombre.length < 5){
      this.missingName = true;
      this.missingMessage = true;
    }
    if(this.presupuesto == null){
      this.missingPresupuesto = true;
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
        if(this.reglasPuntuacion == null){
          this.reglasPuntuacion = "";
        }
        this.tiempoInicio = this.horaInicio.toString()+":"+this.minInicio.toString();
        this.tiempoFin = this.horaFin.toString()+":"+this.minFin.toString();
        const datepipe: DatePipe = new DatePipe('en-US');
        this.formatoFechaInicio = datepipe.transform(this.fechaInicio, 'YYYY-MM-dd');
        this.formatoFechaFin = datepipe.transform(this.fechaFin, 'YYYY-MM-dd');
        this.crearCampeonato();  
    }
    
  }

  /**
   * <p> Este método asigna los valores correspondientes a cada uno de los atributos de la variable campeonato de acuerdo
   * a lo ingresado por el usuario en los inputs y posteriormente esta se pasa como parámtro al método de crearCampeonato del servicio de 
   * Campeonatos para hacer el post de este registro en la tabla Campeonatos en la base de datos. Cuando termina, hace un rerouting a la
   * página de visualización de los campeonatos</p>
   *  
   */
  crearCampeonato(){
    this.campeonato = 
      {id: "", nombre: this.nombre, presupuesto: this.presupuesto, fechaInicio: this.formatoFechaInicio, horaInicio: this.tiempoInicio, fechaFin: this.formatoFechaFin, horaFin: this.tiempoFin, reglasPuntuacion: this.reglasPuntuacion}
    ;
    
    this.campeonatoSrv.crearCampeonato(this.campeonato).pipe(first()).subscribe();
    location.href = "http://localhost:4200/campeonatos"
    
  }

  /**
   * <p> Este método hace un rerouting a la página de visualizacion de los campeonatos cuando el usuario quiere cancelar la 
   * creación de un nuevo campeonato</p>
   *  
   */
  cancelar(){
    this.route.navigate(['/campeonatos']);
  }

  /**
   * <p> Restaura las banderas al valor original que tenían antes de hacer las validaciones</p>
   */
  restaurarBanderas(){
    this.missingName = false;
    this.missingPresupuesto = false;
    this.missingFechaInicio = false;
    this.missingFechaFin = false;
    this.missingHoraInicio = false;
    this.missingMinInicio = false;
    this.missingHoraFin = false;
    this.missingMinFin = false;
  
    this.missingMessage = false;
  }

  /**
   * <p> Llama al servicio de campeonatos para obtener las fechas de los campeonatos ya creados para 
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
