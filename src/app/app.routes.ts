import { Routes } from '@angular/router';
import { TableDenunciaComponent } from './components/denuncia/table-denuncia/table-denuncia.component';
import { autenticacaoGuard } from './core/guards/autenticacao.guard';
import { FormDenunciaComponent } from './components/denuncia/form-denuncia/form-denuncia.component';
import { FormLoginComponent } from './components/autenticacao/form-login/form-login.component';



export const routes: Routes = [
    { path: 'login', component: FormLoginComponent },
    { path: 'denuncias', component: TableDenunciaComponent, canActivate: [autenticacaoGuard] },
    { path: 'denuncia', component: FormDenunciaComponent, canActivate: [autenticacaoGuard] },
    { path: 'denuncia/:id', component: FormDenunciaComponent, canActivate: [autenticacaoGuard] },
   
];
