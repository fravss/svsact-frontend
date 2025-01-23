import { Routes } from '@angular/router';
import { ListaDenunciaComponent } from './components/denuncia/lista-denuncia/lista-denuncia.component';
import { FormularioDenunciaComponent } from './components/denuncia/formulario-denuncia/formulario-denuncia.component';
import { LoginComponent } from './components/login/login.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'denuncias', component: ListaDenunciaComponent },
    { path: 'criar-denuncia', component: FormularioDenunciaComponent }
];
