import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-roles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.css']
})
export class ListRolesComponent {
  roles: any[] = [];
  rolFiltrado: any[] = [];

  async ngOnInit() {
    await this.obtenerRoles();
  }

  regRol() {
    window.location.replace('registerRoles');
  }

  async obtenerRoles() {
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
      this.rolFiltrado = this.roles;
    } catch (error) {
      alert('Error al obtener roles: ' + (error as Error).message);
    }
  }

  async buscarRol() {
    const searchIdElement = document.getElementById('search-id') as HTMLInputElement;
    const searchId = Number(searchIdElement.value);

    if (isNaN(searchId) || searchId <= 0) {
      alert('Por favor ingrese un ID válido.');
      this.rolFiltrado = [];
      return;
    }

    try {
      const response = await fetch('https://accused-hedwig-sajaremastered-673fe6dd.koyeb.app/obtRol', {
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
      this.rolFiltrado = result ? [result] : [];
    } catch (error) {
      alert('Error al buscar rol: ' + (error as Error).message);
      this.rolFiltrado = [];
    }
  }

  async eliminarRol(id: number) {
    if (!confirm('¿Estás seguro de que deseas eliminar este rol?')) {
      return;
    }

    try {
      const response = await fetch('https://accused-hedwig-sajaremastered-673fe6dd.koyeb.app/eliminarRol', {
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
      alert('Rol eliminado con éxito: ' + JSON.stringify(result));
      await this.obtenerRoles();
    } catch (error) {
      alert('Error al eliminar rol: ' + (error as Error).message);
    }
  }

  resetBusqueda() {
    this.rolFiltrado = this.roles;
    const searchIdElement = document.getElementById('search-id') as HTMLInputElement;
    searchIdElement.value = '';
  }
}
