import { Component } from '@angular/core';
import { AutenticacaoService } from '../../../services/autenticacao.service';
import { Router } from '@angular/router';
import { MatButton, MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-logout-button',
  imports: [ MatButton, MatButtonModule],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.scss'
})
export class LogoutButtonComponent {
  constructor(private autenticacaoService: AutenticacaoService, private router: Router){}

   logout(): void {
            this.autenticacaoService.logout();
            this.router.navigate(['/login']);   
   }

}
