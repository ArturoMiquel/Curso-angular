import { RestService } from './../rest.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicioDeFavoritosService } from '../servicio-de-favoritos.service';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { TraducirTipoPipe } from "../traducir-tipo.pipe";

@Component({
  selector: 'app-post-detail',
  imports: [CommonModule, HeaderComponent, FormsModule, ReactiveFormsModule, SidebarComponent, TraducirTipoPipe],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  public respuesta: any; 
  public comentarios: any = [];
  comentarioText: string = '';
  public form: FormGroup = new FormGroup({});

  constructor(
    private route: ActivatedRoute,
    private RestService: RestService,
    private formBuilder: FormBuilder,
    private servicioFavorito: ServicioDeFavoritosService // Inyectar el servicio de favoritos
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cargarData(params['variable']).then(() => {
        this.cargarComentarios(); // Llama a cargarComentarios después de cargarData
      });
    });
    this.form = this.formBuilder.group({
      textAreaComentario: ['']
    });
  }

  cargarData(id: string): Promise<void> {
    return new Promise((resolve) => {
      this.RestService.get(`https://pokeapi.co/api/v2/pokemon/${id}`).subscribe(respuesta => {
        console.log('Respuesta de la API', respuesta);
        this.respuesta = respuesta;
        resolve(); // Resuelve la promesa cuando los datos se han cargado
      });
    });
  }

  cargarComentarios() {
    const pokemonId = this.respuesta?.id; // Asegúrate de que `respuesta` tenga el ID del Pokémon
    this.RestService.get(`http://localhost:3000/comments?pokemonId=${pokemonId}`)
      .subscribe(respuesta => {
        console.log('Comentarios cargados:', respuesta);
        this.comentarios = respuesta; // Filtra los comentarios por el ID del Pokémon
      });
  }

  public enviarData() {
    const nuevoComentario = {
      id: this.comentarios.length + 1, // Generar un ID único basado en la longitud actual
      pokemonId: this.respuesta?.id, // Asocia el comentario con el ID del Pokémon actual
      text: this.form.value.textAreaComentario
    };

    this.RestService.post(`http://localhost:3000/comments`, nuevoComentario) // Cambia el puerto a 3000
      .subscribe(respuesta => {
        console.log('Comentario enviado!!!', respuesta);
        this.form.reset();
        this.cargarComentarios(); // Recargar los comentarios inmediatamente después de enviar
      }, error => {
        console.error('Error al enviar el comentario:', error);
      });
  }

  agregarAFavoritos() {
    const favorito = {
      id: this.respuesta.id.toString(),
      name: this.respuesta.name,
      sprite: this.respuesta.sprites.other['official-artwork'].front_default
    };

    this.servicioFavorito.obtenerFavoritos().subscribe((favoritos: any[]) => {
      favoritos = favoritos || [];
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
