import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-promo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-promo.component.html',
  styleUrls: ['./list-promo.component.css']
})
export class ListPromocionComponent {
  promociones: any[] = [];
  promocionesFiltradas: any[] = []; 

  async ngOnInit() {
    await this.obtenerPromociones();
  }

  regPromocion() {
    window.location.replace('registerPromo');
  }

  async obtenerPromociones() {
    try {
      const response = await fetch('https://accused-hedwig-sajaremastered-673fe6dd.koyeb.app/promociones', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud GET: ' + response.statusText);
      }

      this.promociones = await response.json();
      this.promocionesFiltradas = this.promociones; 
    } catch (error) {
      alert('Error al obtener promociones: ' + (error as Error).message);
    }
  }

  async buscarPromocion() {
    const searchIdElement = document.getElementById('search-id') as HTMLInputElement;
    const searchId = Number(searchIdElement.value);

    if (isNaN(searchId) || searchId <= 0) {
      alert('Por favor ingrese un ID válido.');
      this.promocionesFiltradas = [];
      return;
    }

    try {
      const response = await fetch('https://accused-hedwig-sajaremastered-673fe6dd.koyeb.app/obtPromocion', {
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
        this.promocionesFiltradas = []; 
      } else {
        this.promocionesFiltradas = [result]; 
      }
    } catch (error) {
      alert('Error al buscar promoción: ' + (error as Error).message);
      this.promocionesFiltradas = [];
    }
  }

  async eliminarPromocion(id: number) {
    if (!confirm('¿Estás seguro de que deseas eliminar esta promoción?')) {
      return;
    }

    try {
      const response = await fetch('https://accused-hedwig-sajaremastered-673fe6dd.koyeb.app/eliminarPromocion', {
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
      alert('Promoción eliminada con éxito: ' + JSON.stringify(result));
      await this.obtenerPromociones();
    } catch (error) {
      alert('Error al eliminar promoción: ' + (error as Error).message);
    }
  }

  resetBusqueda() {
    this.promocionesFiltradas = this.promociones;
    const searchIdElement = document.getElementById('search-id') as HTMLInputElement;
    searchIdElement.value = ''; // Limpiar el campo de búsqueda
  }
}
