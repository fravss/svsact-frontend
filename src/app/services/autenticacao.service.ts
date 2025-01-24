import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs/internal/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private jwtHelper = new JwtHelperService();

  private baseUrl =  environment.apiUrl + '/auth/login';
 
   constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

   login(usuario: Usuario) : Observable<any>{
     console.log('aqui',usuario)
     return this.http.post<Usuario>(`${this.baseUrl}`, usuario);
   }

   saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('jwtToken');
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
  }
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    return !this.jwtHelper.isTokenExpired(token);
  }
  
}
