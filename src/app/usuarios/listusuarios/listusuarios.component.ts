import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-listusuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listusuarios.component.html',
  styleUrls: ['./listusuarios.component.css']
})
export class ListusuariosComponent implements OnInit {
  usuarios: any[] = [];
  usuariosFiltrados: any[] = []; 
constructor(private cookie:CookieService){

}
  async ngOnInit() {
    if (this.verificarLogin())
    await this.obtenerUsuarios();
  }
verificarLogin(){
  if(this.cookie.get('rol')!='1'){
    window.location.replace('/login')
    return false;
  }
  return true;
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
      this.usuariosFiltrados = this.usuarios; 
    } catch (error) {
      alert('Error al obtener usuarios: ' + (error as Error).message);
    }
  }

  async buscarUsuario() {
    const searchIdElement = document.getElementById('search-id') as HTMLInputElement;
    const searchId = Number(searchIdElement.value);

    if (isNaN(searchId) || searchId <= 0) {
      alert('Por favor ingrese un ID válido.');
      this.usuariosFiltrados = [];
      return;
    }

    try {
      const response = await fetch('https://accused-hedwig-sajaremastered-673fe6dd.koyeb.app/obtUsuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: searchId })
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud POST: ' + response.statusText);
      }

      const result = await response.json();
      if (!result) {
        alert('Usuario no encontrado.');
        this.usuariosFiltrados = []; 
      } else {
        this.usuariosFiltrados = [result]; 
        alert('Usuario encontrado: ' + JSON.stringify(result));
      }
    } catch (error) {
      alert('Error al buscar usuario: ' + (error as Error).message);
      this.usuariosFiltrados = [];
    }
  }

  async eliminarUsuario(id: number) {
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      return;
    }

    try {
      const response = await fetch('https://accused-hedwig-sajaremastered-673fe6dd.koyeb.app/eliminarUsuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud POST: ' + response.statusText);
      }

      const result = await response.json();
      alert('Usuario eliminado con éxito: ' + JSON.stringify(result));
      await this.obtenerUsuarios();
    } catch (error) {
      alert('Error al eliminar usuario: ' + (error as Error).message);
    }
  }


  resetBusqueda() {
    this.usuariosFiltrados = this.usuarios;
    const searchIdElement = document.getElementById('search-id') as HTMLInputElement;
    searchIdElement.value = ''; // Limpiar el campo de búsqueda
  }
}
