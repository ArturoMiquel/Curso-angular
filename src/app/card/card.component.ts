import { Component, OnInit, Input } from '@angular/core';
import { ServicioDeFavoritosService } from '../servicio-de-favoritos.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TraducirTipoPipe } from "../traducir-tipo.pipe";

@Component({
  selector: 'app-card',
  imports: [RouterModule, CommonModule, TraducirTipoPipe], // Importa CommonModule para habilitar pipes como titlecase
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() dataEntrante: any;
  public image: string = '';

  constructor(private servicioFavorito: ServicioDeFavoritosService) {}

  ngOnInit(): void {
    console.log('Entrando dataEntrante:', this.dataEntrante);
  }

  agregarFavorito(event: Event) {
    event.stopPropagation(); // Detiene la propagación del evento de clic
    const favorito = {
      id: this.dataEntrante.id.toString(),
      name: this.dataEntrante.name,
      sprite: this.dataEntrante.sprites.other['official-artwork'].front_default
    };

    this.servicioFavorito.obtenerFavoritos().subscribe((favoritos: any[]) => {
      favoritos = favoritos || []; // Asegúrate de que favoritos sea un array
      const existe = favoritos.some((f: any) => f.id === favorito.id);
      if (existe) {
        console.log('El Pokémon ya está en favoritos, no se añadirá.');
      } else {
        this.servicioFavorito.agregarFavorito(favorito).then(() => {
          console.log('Favorito guardado en db.json');
          this.servicioFavorito.disparadorDeFavoritos.emit(favorito);
        }).catch(error => {
          console.error('Error al guardar el favorito:', error);
        });
      }
    }, error => {
      console.error('Error al obtener favoritos:', error);
    });
  }
}
