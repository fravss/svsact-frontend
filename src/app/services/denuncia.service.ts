import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Denuncia } from '../interfaces/denuncia';

@Injectable({
  providedIn: 'root'
})
export class DenunciaService {

  private baseUrl =  environment.apiUrl + '/denuncia';

  constructor(private http: HttpClient) { }

  async getDenuncia(): Promise<any> {
    console.log("no get den");
    return await firstValueFrom(this.http.get<any>(this.baseUrl));
  }

  async getDenunciaById(id: number): Promise<any> {
    return await firstValueFrom(this.http.get<any>(`${this.baseUrl}/${id}`));
  }

  async deleteDenuncia(id: number): Promise<any> {
    return await firstValueFrom(this.http.delete<any>(`${this.baseUrl}/${id}`));
  }

  async addDenuncia(denuncia: Denuncia): Promise<Denuncia> {
    console.log(denuncia);
    return await firstValueFrom(this.http.post<Denuncia>(`${this.baseUrl}`, denuncia));
  }

  async updateDenuncia(denuncia: Denuncia, id: number): Promise<Denuncia> {
    return await firstValueFrom(this.http.put<Denuncia>(`${this.baseUrl}/${id}`, denuncia));
  }

  async getOrigemDenuncias(): Promise<string[]> {
    return await firstValueFrom(this.http.get<string[]>(`${this.baseUrl}/origem-denuncia`));
  }

  async getDireitosViolados(): Promise<string[]> {
    return await firstValueFrom(this.http.get<string[]>(`${this.baseUrl}/direito-violado`));
  }

  async getAgenteViolador(): Promise<string[]> {
    console.log('aqui');
    return await firstValueFrom(this.http.get<string[]>(`${this.baseUrl}/agente-violador`));
  }
  
  

}
