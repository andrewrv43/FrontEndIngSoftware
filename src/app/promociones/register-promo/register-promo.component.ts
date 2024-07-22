import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register-promo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register-promo.component.html',
  styleUrls: ['./register-promo.component.css']
})
export class RegisterPromoComponent {
  productos : any[] = [];

  constructor(private cookie: CookieService) {
  }
  ngOnInit(): void {
    if(this.verificarLogin()){
      this.getProductos();
    }
    
  }
  verificarLogin() {
    if (this.cookie.get('rol') != '1') {
      window.location.replace('/login')
      return false;
    }
    return true;
  }
  async getProductos(){
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

    } catch (error) {
      alert('Error al obtener productos: ' + (error as Error).message);
    }
  }
  async registrarPromocion(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const promocionData = {
      id_producto: parseInt(formData.get('id_producto') as string, 10),
      porcentaje: parseInt(formData.get('porcentaje') as string, 10),
    };

    try {
      const response = await fetch('https://accused-hedwig-sajaremastered-673fe6dd.koyeb.app/nuevaPromocion', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(promocionData)
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
      }

      const result = await response.json();
      console.log('Resultado de la solicitud:', result);
      alert('Promoción registrada con éxito: ' + JSON.stringify(result));
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
