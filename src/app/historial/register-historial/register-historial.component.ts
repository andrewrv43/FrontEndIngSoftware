import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register-historial.component.html',
  styleUrls: ['./register-historial.component.css']
})
export class RegisterHistorialComponent {

  async registrarHistorial(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const historialData = {
      id_usuario: parseInt(formData.get('id_usuario') as string, 10),
      productos: formData.get('productos') as string,
      total: parseFloat(formData.get('total') as string)
    };

    try {
      const response = await fetch('https://accused-hedwig-sajaremastered-673fe6dd.koyeb.app/nuevoHistorial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(historialData)
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
      }

      const result = await response.json();
      alert('Historial registrado con éxito: ' + JSON.stringify(result));
      form.reset(); // Limpiar el formulario

    } catch (error) {
      alert('Error al registrar historial: ' + (error as Error).message);
    }
  }
}
