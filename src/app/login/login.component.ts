import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private cookie: CookieService) {

  }
  cedula: string = '';
  password: string = '';
  usuarios: [any] = [{}]
  async inicioSesion() {
     if(await this.obtenerUsuarios()){
      window.location.replace('/')
     }
  }
  async obtenerUsuarios() {
    try {
      const response = await fetch('https://accused-hedwig-sajaremastered-673fe6dd.koyeb.app/usuarios', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud GET: ' + response.statusText);
      }
      this.usuarios = await response.json();
      for (let us of this.usuarios) {
        if (us.cedula == this.cedula && us.password==this.password) {
          this.cookie.set('cedula', this.cedula)
          this.cookie.set('rol', us.id_rol)
          return us;
        }
      }
      this.cookie.set('cedula', '')
          this.cookie.set('rol','')
      return false;
    } catch (error) {
      alert('Error al obtener usuarios: ' + (error as Error).message);
    }
  }

}
