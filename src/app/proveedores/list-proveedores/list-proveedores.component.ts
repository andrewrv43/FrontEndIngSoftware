import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-proveedor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-proveedores.component.html',
  styleUrls: ['./list-proveedores.component.css']
})
export class ListProveedorComponent {
  proveedores: any[] = [];
  proveedorFiltrado: any[] = [];

  async ngOnInit() {
    await this.obtenerProveedores();
  }

  regProveedor() {
    window.location.replace('registerProveedor');
  }

  async obtenerProveedores() {
    try {
      const response = await fetch('https://accused-hedwig-sajaremastered-673fe6dd.koyeb.app/obtProveedores', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud GET: ' + response.statusText);
      }

      this.proveedores = await response.json();
      this.proveedorFiltrado = this.proveedores;
    } catch (error) {
      alert('Error al obtener proveedores: ' + (error as Error).message);
    }
  }


  async eliminarProveedor(id: number) {
    if (!confirm('¿Estás seguro de que deseas eliminar este proveedor?')) {
      return;
    }

    try {
      const response = await fetch('https://accused-hedwig-sajaremastered-673fe6dd.koyeb.app/eliminarProveedor', {
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
      alert('Proveedor eliminado con éxito: ' + JSON.stringify(result));
      await this.obtenerProveedores();
    } catch (error) {
      alert('Error al eliminar proveedor: ' + (error as Error).message);
    }
  }

  resetBusqueda() {
    this.proveedorFiltrado = this.proveedores;
    const searchIdElement = document.getElementById('search-id') as HTMLInputElement;
    searchIdElement.value = '';
  }
}
