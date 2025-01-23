import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UsuarioLogin } from '../interfaces/usuario';
import { Observable } from 'rxjs/internal/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private jwtHelper = new JwtHelperService();

  private baseUrl =  environment.apiUrl + '/auth/login';
 
   constructor(private http: HttpClient) { }

   login(usuario: UsuarioLogin) : Observable<any>{
     console.log(usuario)
     return this.http.post<UsuarioLogin>(`${this.baseUrl}`, usuario);
   }

   saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
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
