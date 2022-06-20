export interface Jugador {
    nombreUsuario: string;
    correo: string;
    pais: string;
    contrasena: string;
    nombreEscuderia: string,
    idEquipo1: number,
    idEquipo2: number
}

export interface PerfilJugador {
    nombreUsuario: string;
    pais: string;
    nombreEscuderia: string,
    marcaEscuderia: string,
    nombreEquipo: string,
    nombrePiloto1: string,
    nombrePiloto2: string,
    nombrePiloto3: string,
    nombrePiloto4: string,
    nombrePiloto5: string
}

export interface CorreoJugador{
    correo : string;
}

export interface DatosLogin{
    correo : string;
    contrasena : string;
}

