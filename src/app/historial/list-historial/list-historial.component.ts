import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-historial.component.html',
  styleUrls: ['./list-historial.component.css']
})
export class ListHistorialComponent {
  historial: any[] = [];
  historialFiltrado: any[] = []; 

  async ngOnInit() {
    await this.obtenerHistorial();
  }

  regHistorial() {
    window.location.replace('registerHistorial');
  }

  async obtenerHistorial() {
    try {
      const response = await fetch('https://accused-hedwig-sajaremastered-673fe6dd.koyeb.app/historial', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud GET: ' + response.statusText);
      }

      this.historial = await response.json();
      this.historialFiltrado = this.historial; 
    } catch (error) {
      alert('Error al obtener historial: ' + (error as Error).message);
    }
  }

  async buscarHistorial() {
    const searchIdElement = document.getElementById('search-id') as HTMLInputElement;
    const searchId = Number(searchIdElement.value);

    if (isNaN(searchId) || searchId <= 0) {
      alert('Por favor ingrese un ID válido.');
      this.historialFiltrado = [];
      return;
    }

    try {
      const response = await fetch('https://accused-hedwig-sajaremastered-673fe6dd.koyeb.app/obtHistorial', {
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
        this.historialFiltrado = []; 
      } else {
        this.historialFiltrado = [result]; 
      }
    } catch (error) {
      alert('Error al buscar historial: ' + (error as Error).message);
      this.historialFiltrado = [];
    }
  }

  async eliminarHistorial(id: number) {
    if (!confirm('¿Estás seguro de que deseas eliminar este historial?')) {
      return;
    }

    try {
      const response = await fetch('https://accused-hedwig-sajaremastered-673fe6dd.koyeb.app/eliminarHistorial', {
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
      alert('Historial eliminado con éxito: ' + JSON.stringify(result));
      await this.obtenerHistorial();
    } catch (error) {
      alert('Error al eliminar historial: ' + (error as Error).message);
    }
  }

  resetBusqueda() {
    this.historialFiltrado = this.historial;
    const searchIdElement = document.getElementById('search-id') as HTMLInputElement;
    searchIdElement.value = ''; // Limpiar el campo de búsqueda
  }
}
