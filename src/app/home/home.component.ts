import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CardComponent } from "../card/card.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RestService } from '../rest.service';
import { ServicioDeFavoritosService } from '../servicio-de-favoritos.service';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, CardComponent, SidebarComponent, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public listaDeVideos: any = [];
  public favoritos: any[] = [];

  constructor(private RestService: RestService, private servicioFavorito: ServicioDeFavoritosService) {}

  ngOnInit(): void {
    this.cargarData();
    
  }

  public cargarData(){  
    const usedIds = new Set<number>();

    for(let i = 1; i <= 12; i++){
      let randomId;
      do {
        randomId = Math.floor(Math.random() * 151) + 1;
      } while (usedIds.has(randomId));
      usedIds.add(randomId);

      this.RestService.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`).subscribe(respuesta => {      

        console.log('Respuesta de la API', respuesta);
        this.listaDeVideos.push(respuesta);
      });
    }  
  }
}
