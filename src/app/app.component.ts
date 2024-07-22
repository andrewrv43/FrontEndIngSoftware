import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ListusuariosComponent } from './usuarios/listusuarios/listusuarios.component';
import { CrearUsuariosComponent } from './usuarios/crearusuarios/crearusuarios.component';
import { CookieService } from 'ngx-cookie-service';
import { ListProductoComponent } from './productos/list-producto/list-producto.component';
import { RegisterProductoComponent } from './productos/register-producto/register-producto.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ListusuariosComponent,CrearUsuariosComponent, ListProductoComponent, RegisterProductoComponent,HomeComponent, RouterLink,RouterLinkActive,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private cookie: CookieService) {
  }
  ngOnInit(): void {

    const key = this.cookie.get('cedula');
    const rol = this.cookie.get('rol');
    if (key && rol) {
      this.logged = true;
    } else {

      this.logged = false;
    }

  }

  logged: boolean = false;
  title = 'FrontEndIngSoftware';

  cerrarSesion(){
    this.cookie.set('cedula','');
    this.cookie.set('rol','');
    window.location.replace('/login')
  }
}


