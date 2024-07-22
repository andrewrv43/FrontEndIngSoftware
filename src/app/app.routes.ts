import { Routes } from '@angular/router';
import { ListusuariosComponent } from './usuarios/listusuarios/listusuarios.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { ListProductoComponent } from './productos/list-producto/list-producto.component';
import { RegisterProductoComponent } from './productos/register-producto/register-producto.component';


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
    {path:'productos',
        component:ListProductoComponent
    },
    {path:'registerProduct',
        component:RegisterProductoComponent
    }
];
