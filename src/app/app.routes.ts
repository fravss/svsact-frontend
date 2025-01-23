import { Routes } from '@angular/router';
import { ListaDenunciaComponent } from './components/denuncia/lista-denuncia/lista-denuncia.component';
import { FormularioDenunciaComponent } from './components/denuncia/formulario-denuncia/formulario-denuncia.component';
import { LoginComponent } from './components/autenticacao/login/login.component';
import { autenticacaoGuard } from './core/guards/autenticacao.guard';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'denuncias', component: ListaDenunciaComponent, canActivate: [autenticacaoGuard] },
    { path: 'criar-denuncia', component: FormularioDenunciaComponent, canActivate: [autenticacaoGuard] }
];
