import { Routes } from '@angular/router';
import { ListaDenunciaComponent } from './components/denuncia/lista-denuncia/lista-denuncia.component';
import { FormularioDenunciaComponent } from './components/denuncia/formulario-denuncia/formulario-denuncia.component';


export const routes: Routes = [
    { path: 'denuncias', component: ListaDenunciaComponent },
    { path: 'criar-denuncia', component: FormularioDenunciaComponent }
];
