import { RestService } from './../rest.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-views',
  imports: [HeaderComponent, MatTableModule, MatPaginatorModule, MatSortModule, CommonModule],
  standalone: true,
  templateUrl: './list-views.component.html',
  styleUrl: './list-views.component.css'
})
export class ListViewsComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<{ image: string; views: number; name: string }>();
  displayedColumns = ['image', 'views', 'name'];

  constructor(private RestService: RestService) {}

  ngOnInit(): void {
    this.cargarData();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort; // Asigna el MatSort al dataSource
  }

  cargarData(): void {
    this.RestService.get(`https://pokeapi.co/api/v2/pokemon?limit=1302`).subscribe((respuesta: any) => {
      console.log('Respuesta de la API', respuesta);
      const requests = respuesta.results.map((item: any) =>
        this.RestService.get(item.url).toPromise()
      );

      Promise.all(requests).then((responses: any[]) => {
        const data = responses.map((pokemon: any) => {
          return {
            image: pokemon.sprites.other['official-artwork'].front_default,
            views: pokemon.id,
            name: pokemon.name
          };
        });
        this.dataSource.data = data; // Asigna los datos al dataSource
        console.log('Data procesada', this.dataSource.data);
      });
    });
  }
}
