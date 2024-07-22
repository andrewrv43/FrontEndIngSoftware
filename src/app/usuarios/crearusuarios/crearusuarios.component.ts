import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crearusuarios',
  standalone: true,
  templateUrl: './crearusuarios.component.html',
  styleUrls: ['./crearusuarios.component.css']
})
export class CrearUsuariosComponent implements OnInit {

  async ngOnInit() {
    // Puedes incluir lógica adicional si es necesario al iniciar el componente
  }

  async crearUsuario(event: Event) {
    event.preventDefault(); 

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const usuarioData = {
      cedula: formData.get('cedula') as string,
      id_rol: parseInt(formData.get('id_rol') as string, 10),
      nombre: formData.get('nombre') as string,
      password: formData.get('password') as string
    };

    try {
      const response = await fetch('https://accused-hedwig-sajaremastered-673fe6dd.koyeb.app/nuevoUsuario', {
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
      alert('Usuario creado con éxito: ' + JSON.stringify(result));

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
