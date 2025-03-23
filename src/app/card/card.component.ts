import { Component, OnInit, Input } from '@angular/core';
import { ServicioDeFavoritosService } from '../servicio-de-favoritos.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [RouterModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() dataEntrante: any;
  public image: string = '';

  constructor(private servicioFavorito: ServicioDeFavoritosService) { }

  ngOnInit(): void {
    this.image = 'https://picsum.photos/536/354';
    console.log('Entrando dataEntrante', this.dataEntrante);
  }

  agregarFavorito(){
    console.log('Agregando a favoritos', this.dataEntrante);
    this.servicioFavorito.disparadorDeFavoritos.emit(this.dataEntrante);
  }
}
