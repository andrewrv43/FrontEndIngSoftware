import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crearusuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crearusuarios.component.html',
  styleUrls: ['./crearusuarios.component.css']
})
export class CrearUsuariosComponent implements OnInit {
  roles: any[] = [];
  constructor(private cookie: CookieService) {

  }
  async ngOnInit() {
    if (this.verificarLogin()) {
      this.getRoles();
    }
  }
  verificarLogin() {
    if (this.cookie.get('rol') != '1') {
      window.location.replace('/login')
      return false;
    }
    return true;
  }
  async getRoles() {
    try {
      const response = await fetch('https://accused-hedwig-sajaremastered-673fe6dd.koyeb.app/obtRoles', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud GET: ' + response.statusText);
      }
      this.roles = await response.json();

    } catch (error) {
      alert('Error al obtener productos: ' + (error as Error).message);
    }
  }

  async crearUsuario(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const usuarioData = {
      cedula: formData.get('cedula') as string,
      id_rol: parseInt(formData.get('id_rol') as string, 10),
      nombre: formData.get('nombre') as string,
      password: formData.get('password') as string
    };

    try {
      const response = await fetch('https://accused-hedwig-sajaremastered-673fe6dd.koyeb.app/nuevoUsuario', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuarioData)
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
      }

      const result = await response.json();
      console.log('Resultado de la solicitud:', result);
      alert('Usuario creado con éxito: ' + JSON.stringify(result));
      form.reset();

    } catch (error) {
      // Verifica si el error es una instancia de Error
      if (error instanceof Error) {
        alert('Error en la solicitud POST: ' + error.message);
      } else {
        alert('Error desconocido');
      }
    }
  }
}
