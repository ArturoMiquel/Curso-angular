import { Component, OnInit, Input } from '@angular/core';
import { ServicioDeFavoritosService } from '../servicio-de-favoritos.service';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-card',
  imports: [RouterModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() dataEntrante: any;
  public image: string = '';

  constructor(private servicioFavorito: ServicioDeFavoritosService, private http: HttpClient) { }

  ngOnInit(): void {
    //this.image = 'https://picsum.photos/536/354';
    console.log('Entrando dataEntranteeeeeeeeeeeeeeeeeeeeee', this.dataEntrante);
  }

  agregarFavorito(event: Event) {
    event.stopPropagation(); // Detiene la propagación del evento de clic
    const favorito = {
      id: this.dataEntrante.id.toString(), // Convierte el ID a string
      name: this.dataEntrante.name,
      sprite: this.dataEntrante.sprites.other['official-artwork'].front_default // Solo pasa el front_default
    };

    // Comprobar si el Pokémon ya está en favoritos
    this.http.get(`http://localhost:3000/favorites/${favorito.id}`).subscribe(
      () => {
        console.log('El Pokémon ya está en favoritos, no se añadirá.');
      },
      (error) => {
        if (error.status === 404) {
          // Si no está en favoritos, añadirlo
          this.http.post('http://localhost:3000/favorites', favorito).subscribe(() => {
            console.log('Favorito guardado en db.json');
            this.servicioFavorito.disparadorDeFavoritos.emit(favorito);
          }, postError => {
            console.error('Error al guardar el favorito:', postError);
          });
        } else {
          console.error('Error al comprobar si el Pokémon está en favoritos:', error);
        }
      }
    );
  }
}
