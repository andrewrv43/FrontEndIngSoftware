import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
@Component({

  selector: 'app-register-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register-producto.component.html',
  styleUrl: './register-producto.component.css'
})
export class RegisterProductoComponent implements OnInit {
  proveedores : any[] = [];

  constructor(private cookie: CookieService) {
  }
  ngOnInit(): void {
    if(this.verificarLogin()){
      this.getProveedores();
    }
    
  }
  verificarLogin() {
    if (this.cookie.get('rol') != '1') {
      window.location.replace('/login')
      return false;
    }
    return true;
  }
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

  async getProveedores(){
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

    } catch (error) {
      alert('Error al obtener productos: ' + (error as Error).message);
    }
  }

}
