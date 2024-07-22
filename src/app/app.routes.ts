import { Routes } from '@angular/router';
import { ListusuariosComponent } from './usuarios/listusuarios/listusuarios.component';


export const routes: Routes = [
    {
        path: 'listaUsuarios',
        redirectTo: '/usuarios',
        pathMatch: 'full'
    },
    {
        path: 'usuarios',
        component: ListusuariosComponent
    }
];
