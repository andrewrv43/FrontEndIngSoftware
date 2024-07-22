import { Routes } from '@angular/router';
import { ListusuariosComponent } from './usuarios/listusuarios/listusuarios.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';


export const routes: Routes = [
    {
        path: 'listaUsuarios',
        redirectTo: '/usuarios',
        pathMatch: 'full'
    },
    {
        path: 'usuarios',
        component: ListusuariosComponent
    },
    {
        path:'login',
        component: LoginComponent
    },
    {path:'app',
        component:AppComponent
    }
];
