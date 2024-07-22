import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-roles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register-roles.component.html',
  styleUrls: ['./register-roles.component.css']
})
export class RegisterRolesComponent {

  async registrarRol(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const rolData = {
      nombre: formData.get('nombre') as string
    };

    try {
      const response = await fetch('https://accused-hedwig-sajaremastered-673fe6dd.koyeb.app/nuevoRol', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rolData)
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
      }

      const result = await response.json();
      alert('Rol registrado con éxito: ' + JSON.stringify(result));
      form.reset(); // Limpiar el formulario

    } catch (error) {
      alert('Error al registrar rol: ' + (error as Error).message);
    }
  }
}
