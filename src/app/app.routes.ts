import { Routes } from '@angular/router';
import { TableDenunciaComponent } from './components/denuncia/table-denuncia/table-denuncia.component';
import { LoginComponent } from './components/autenticacao/login/login.component';
import { autenticacaoGuard } from './core/guards/autenticacao.guard';
import { FormDenunciaComponent } from './components/denuncia/form-denuncia/form-denuncia.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'denuncias', component: TableDenunciaComponent, canActivate: [autenticacaoGuard] },
    { path: 'denuncia', component: FormDenunciaComponent, canActivate: [autenticacaoGuard] },
    { path: 'denuncia/:id', component: FormDenunciaComponent, canActivate: [autenticacaoGuard] },

];
