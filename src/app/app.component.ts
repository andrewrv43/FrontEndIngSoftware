import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListusuariosComponent } from './usuarios/listusuarios/listusuarios.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ListusuariosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontEndIngSoftware';
}
