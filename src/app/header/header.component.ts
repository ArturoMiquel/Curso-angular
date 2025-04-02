import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule], // Importa FormsModule para habilitar ngModel
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
    this.router.navigate(['/']); // Redirige a la página principal
  }
}
