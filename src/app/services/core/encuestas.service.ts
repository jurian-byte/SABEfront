import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Encuesta, Pregunta, } from 'src/app/models/encuestas';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  private apiUrl = '';
 

  constructor(private http: HttpClient) { }
  
  private encuestasUrl = '/api/encuesta';

  

  getEncuesta(): Observable<Encuesta> {
    return this.http.get<Encuesta>(this.encuestasUrl);
  }


  getPreguntas(): Observable<Pregunta[]> {
    const preguntasUrl = '/api/encuesta';
    return this.http.get<Pregunta[]>(preguntasUrl);
  }
  

  
  deletePreguntas(selectedPreguntas: Pregunta[]): Observable<any> {
    const selectedIds = selectedPreguntas.map(pregunta => pregunta.idPregunta);
    const deleteUrl = `${this.encuestasUrl}/multiples/${selectedIds.join(',')}`;
    return this.http.delete(deleteUrl);
  }

  updatePregunta(pregunta: Pregunta): Observable<Pregunta> {
    return this.http.put<Pregunta>(`${this.encuestasUrl}/${pregunta.idPregunta}`, 
    {
      idPregunta: pregunta.idPregunta.toString(),
      pregunta: pregunta.pregunta.toString(),
    });
  }


  addPregunta(pregunta: Pregunta): Observable<Pregunta> {
    return this.http.post<Pregunta>(this.encuestasUrl,{
      idPregunta: pregunta.idPregunta.toString(),
      pregunta: pregunta.pregunta.toString(),

    } );
  }

  deletePregunta(id: number): Observable<Pregunta> {
    return this.http.delete<Pregunta>(`${this.encuestasUrl}/${id}`);
  }
  

  enviarRespuesta(idPregunta: number, rating: number): Observable<any> {
    const url = `${this.encuestasUrl}/respuesta`; 
    const respuesta = { 
      pregunta_id: idPregunta.toString(),
      respuesta: rating.toString(),
    };
    return this.http.post(url, respuesta);
  }


  getPDFEncuesta(): Observable<any> {
    const url = '/api/PDFEncuesta'; 
    return this.http.get(url, {responseType: 'blob'});

  }
  





  

}
