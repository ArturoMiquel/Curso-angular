import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioDeFavoritosService } from '../servicio-de-favoritos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  constructor(private servicioFavorito: ServicioDeFavoritosService, private http: HttpClient) { }

  public listaDeVideos: Array<any> = [];

  ngOnInit(): void {
    // Cargar favoritos desde db.json
    this.http.get('http://localhost:3000/favorites').subscribe((favoritos: any) => {
      console.log('Favoritos cargados:', favoritos);
      this.listaDeVideos = favoritos;
    });

    this.servicioFavorito.disparadorDeFavoritos.subscribe(data => {
      console.log('Data en sidebar', data);
      this.listaDeVideos.push(data);
    });
  }

  eliminarFavorito(favorito: any) {
    const favoritoId = favorito.id; // Asegúrate de que `favorito.id` sea el ID correcto
    console.log('Intentando eliminar favorito con ID:', favoritoId); // Log para depuración
    this.http.delete(`http://localhost:3000/favorites/${favoritoId}`).subscribe(() => {
      console.log('Favorito eliminado:', favorito);
      // Eliminar el favorito de la lista local
      this.listaDeVideos = this.listaDeVideos.filter(item => item.id !== favoritoId);
    }, error => {
      console.error('Error al eliminar el favorito:', error);
    });
  }
}