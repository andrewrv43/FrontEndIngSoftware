import { Routes } from '@angular/router';
import { ListusuariosComponent } from './usuarios/listusuarios/listusuarios.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { ListProductoComponent } from './productos/list-producto/list-producto.component';
import { RegisterProductoComponent } from './productos/register-producto/register-producto.component';
import { HomeComponent } from './home/home.component';
import { ListPromocionComponent } from './promociones/list-promo/list-promo.component';
import { RegisterPromoComponent } from './promociones/register-promo/register-promo.component';
import { ListProveedorComponent } from './proveedores/list-proveedores/list-proveedores.component';
import { RegisterProveedorComponent } from './proveedores/register-proveedores/register-proveedores.component';
import { ListRolesComponent } from './roles/list-roles/list-roles.component';
import { RegisterRolesComponent } from './roles/register-roles/register-roles.component';
import { ListHistorialComponent } from './historial/list-historial/list-historial.component';
import { RegisterHistorialComponent } from './historial/register-historial/register-historial.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },

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
    },
    {path:'promos',
        component:ListPromocionComponent
    },
    {path:'registerPromo',
        component:RegisterPromoComponent
    },
    {path:'proveedores',
        component:ListProveedorComponent
    },
    {path:'registerProveedor',
        component:RegisterProveedorComponent
    },
    {path:'roles',
        component:ListRolesComponent
    },
    {path:'registerRoles',
        component:RegisterRolesComponent
    },
    {path:'historial',
        component:ListHistorialComponent
    },
    {path:'registerHistorial',
        component:RegisterHistorialComponent
    }
];
