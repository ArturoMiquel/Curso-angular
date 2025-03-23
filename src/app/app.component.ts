import { RestService } from './rest.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServicioDeFavoritosService } from './servicio-de-favoritos.service';

@Component({
  selector: 'app-root',  
  imports: [RouterOutlet, CommonModule],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {
  title = 'portfolio-app';


  constructor() {}

  ngOnInit(): void {
    
  }

}
