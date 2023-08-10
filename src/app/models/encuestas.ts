export interface Encuesta {
  idEncuesta: number;
  nombre: string;
  preguntas: Pregunta[];
}

export interface Pregunta {
  idPregunta: number;
  pregunta: string;
  rating: number;
}



