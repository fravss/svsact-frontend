import { Routes } from '@angular/router';
import { ListaDenunciaComponent } from './components/denuncia/lista-denuncia/lista-denuncia.component';
import { LoginComponent } from './components/autenticacao/login/login.component';
import { autenticacaoGuard } from './core/guards/autenticacao.guard';
import { FormDenunciaComponent } from './components/denuncia/form-denuncia/form-denuncia.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'denuncias', component: ListaDenunciaComponent, canActivate: [autenticacaoGuard] },
    { path: 'denuncia', component: FormDenunciaComponent, canActivate: [autenticacaoGuard] },
    { path: 'denuncia/:id', component: FormDenunciaComponent, canActivate: [autenticacaoGuard] }
];
