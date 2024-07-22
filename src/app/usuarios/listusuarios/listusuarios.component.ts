import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listusuarios',
  standalone: true,
  imports: [],
  templateUrl: './listusuarios.component.html',
  styleUrl: './listusuarios.component.css'
})
export class ListusuariosComponent implements OnInit {
  async ngOnInit(){
    const response = await fetch('https://accused-hedwig-sajaremastered-673fe6dd.koyeb.app/usuarios', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Error en la solicitud GET: ' + response.statusText);
    }
    this.usuarios = await response.json();


  }
  usuarios: [any] = [{}]
}
