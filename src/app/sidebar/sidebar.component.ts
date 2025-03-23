import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioDeFavoritosService } from '../servicio-de-favoritos.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  constructor(private servicioFavorito: ServicioDeFavoritosService) { }

  public listaDeVideos:Array<any> = [];
  
  ngOnInit(): void {
    this.servicioFavorito.disparadorDeFavoritos.subscribe(data => {
      console.log('Data en sidebar', data);
      this.listaDeVideos.push(data);
    })
  }
}