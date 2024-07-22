import { Component } from '@angular/core';

@Component({
  selector: 'app-register-proveedor',
  standalone: true,
  templateUrl: './register-proveedores.component.html',
  styleUrls: ['./register-proveedores.component.css']
})
export class RegisterProveedorComponent {

  async registrarProveedor(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const proveedorData = {
      nombre: formData.get('nombre') as string
    };

    try {
      const response = await fetch('https://accused-hedwig-sajaremastered-673fe6dd.koyeb.app/nuevoProveedor', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proveedorData)
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
      }

      const result = await response.json();
      console.log('Resultado de la solicitud:', result);
      alert('Proveedor registrado con éxito: ' + JSON.stringify(result));
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
