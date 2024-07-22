import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-producto.component.html',
  styleUrl: './list-producto.component.css'
})
export class ListProductoComponent {
  productos: any[] = [];
  productoFiltrado: any[] = []; 

  async ngOnInit() {
    await this.obtenerProductos();
  }
regprod(){
  window.location.replace('registerProduct')
}
  async obtenerProductos() {
    try {
      const response = await fetch('https://accused-hedwig-sajaremastered-673fe6dd.koyeb.app/productos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud GET: ' + response.statusText);
      }

      this.productos = await response.json();
      this.productoFiltrado = this.productos; 
    } catch (error) {
      alert('Error al obtener productos: ' + (error as Error).message);
    }
  }

  async buscarProducto() {
    const searchIdElement = document.getElementById('search-id') as HTMLInputElement;
    const searchId = Number(searchIdElement.value);

    if (isNaN(searchId) || searchId <= 0) {
      alert('Por favor ingrese un ID válido.');
      this.productoFiltrado = [];
      return;
    }

    try {
      const response = await fetch('https://accused-hedwig-sajaremastered-673fe6dd.koyeb.app/obtProducto', {
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
        this.productoFiltrado = []; 
      } else {
        this.productoFiltrado = [result]; 
      }
    } catch (error) {
      alert('Error al buscar producto: ' + (error as Error).message);
      this.productoFiltrado = [];
    }
  }

  async eliminarProducto(id: number) {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      return;
    }

    try {
      const response = await fetch('https://accused-hedwig-sajaremastered-673fe6dd.koyeb.app/eliminarProducto', {
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
      alert('Producto eliminado con éxito: ' + JSON.stringify(result));
      await this.obtenerProductos();
    } catch (error) {
      alert('Error al eliminar Producto: ' + (error as Error).message);
    }
  }


  resetBusqueda() {
    this.productoFiltrado = this.productos;
    const searchIdElement = document.getElementById('search-id') as HTMLInputElement;
    searchIdElement.value = ''; // Limpiar el campo de búsqueda
  }
}
