import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioDeFavoritosService {
  public disparadorDeFavoritos: EventEmitter<any> = new EventEmitter();

  private apiUrl = 'http://localhost:3000/favorites';

  constructor(private http: HttpClient) {}

  async agregarFavorito(favorito: any) {
    try {
      // Obtener todos los favoritos existentes
      const favoritos = (await this.http.get<any[]>(this.apiUrl).toPromise()) || []; // Asegúrate de que sea un array
      const favoritosOrdenados = [...favoritos, favorito].sort((a, b) => parseInt(a.id) - parseInt(b.id));

      // Eliminar todas las entradas existentes
      for (const fav of favoritos) {
        await this.http.delete(`${this.apiUrl}/${fav.id}`).toPromise();
      }

      // Volver a insertar las entradas ordenadas
      for (const fav of favoritosOrdenados) {
        await this.http.post(this.apiUrl, fav).toPromise();
      }

      console.log('Favoritos actualizados y ordenados.');
    } catch (error) {
      console.error('Error al actualizar los favoritos:', error);
    }
  }

  obtenerFavoritos() {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(favoritos => {
        favoritos = favoritos || []; // Asegúrate de que favoritos sea un array
        // Ordenar los favoritos por id
        return favoritos.sort((a, b) => parseInt(a.id) - parseInt(b.id));
      }),
      catchError(error => {
        console.error('Error al obtener favoritos:', error);
        return of([]); // Devuelve un array vacío en caso de error
      })
    );
  }

  eliminarFavorito(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
