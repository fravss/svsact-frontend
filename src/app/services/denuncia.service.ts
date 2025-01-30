import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Denuncia } from '../interfaces/denuncia';

@Injectable({
  providedIn: 'root'
})
export class DenunciaService {

  private baseUrl =  environment.apiUrl + '/denuncia';

  constructor(private http: HttpClient) { }

  getDenuncia(): Observable<any> {
    console.log("no get den")
    return this.http.get<any>(this.baseUrl);
  }
  getDenunciaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
  deleteDenuncia(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
  addDenuncia(denuncia: Denuncia) : Observable<Denuncia>{
    console.log(denuncia)
    return this.http.post<Denuncia>(`${this.baseUrl}`, denuncia);
  }
  updateDenuncia(denuncia: Denuncia, id: number) : Observable<Denuncia>{
    return this.http.put<Denuncia>(`${this.baseUrl}/${id}`, denuncia);
  }
  getOrigemDenuncias(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/origem-denuncia`);
  }
  getDireitosViolados(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/direito-violado`);
  }
  getAgenteViolador(): Observable<string[]> {
    console.log('aqui');
    return this.http.get<string[]>(`${this.baseUrl}/agente-violador`);
  }
  
  

}
