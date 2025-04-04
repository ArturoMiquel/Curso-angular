import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ImagenRotaDirective } from '../imagen-rota.directive'; // Importa la directiva de imagen rota

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule,ImagenRotaDirective], // Importa FormsModule para habilitar ngModel
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public searchValue: string = '';

  constructor(private router: Router) {}

  buscar(): void {
    if (this.searchValue) {
      this.router.navigate([`/post/${this.searchValue}`]); // Redirige a la URL con el número introducido
    }
  }

  irAInicio(): void {
    this.router.navigate(['/home']); // Redirige a la página principal
  }
}
