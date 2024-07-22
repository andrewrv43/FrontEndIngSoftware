import { Component } from '@angular/core';

@Component({
  selector: 'app-register-producto',
  standalone: true,
  imports: [],
  templateUrl: './register-producto.component.html',
  styleUrl: './register-producto.component.css'
})
export class RegisterProductoComponent {

  async registrarProducto(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const usuarioData = {
      id_proveedor: parseInt(formData.get('id_proveedor') as string, 10),
      nombre: formData.get('nombre') as string,
      precio: parseFloat(formData.get('precio') as string),
      stock: parseInt(formData.get('stock') as string, 10),
    };

    try {
      const response = await fetch('https://accused-hedwig-sajaremastered-673fe6dd.koyeb.app/nuevoProducto', {
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
      alert('Producto registrado con éxito: ' + JSON.stringify(result));

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
