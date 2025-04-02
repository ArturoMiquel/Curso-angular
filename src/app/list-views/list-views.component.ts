import { RestService } from './../rest.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-list-views',
  imports: [HeaderComponent, MatTableModule, MatPaginatorModule, MatSortModule],
  standalone: true,
  templateUrl: './list-views.component.html',
  styleUrl: './list-views.component.css'
})
export class ListViewsComponent implements OnInit {
  @ViewChild('editTmpl', { static: true }) editTmpl!: TemplateRef<any>;
  @ViewChild('hdrTpl', { static: true }) hdrTpl!: TemplateRef<any>;

  data: { image: string; views: number; name: string }[] = [];
  columns = ['image', 'views', 'name'];
  cols: { cellTemplate: TemplateRef<any>; headerTemplate: TemplateRef<any>; name: string; }[] | undefined;

  constructor(private RestService:RestService) {

   }

  ngOnInit(): void {
    /*this.cols = [
      {
        cellTemplate: this.editTmpl,
        headerTemplate: this.hdrTpl,
        name: 'image',
      },
      {
        cellTemplate: this.editTmpl,
        headerTemplate: this.hdrTpl,
        name: 'views',
      },
      {
        cellTemplate: this.editTmpl,
        headerTemplate: this.hdrTpl,
        name: 'name',
      }  
    ];*/
    this.cargarData()
  }

  cargarData(): void {
    this.RestService.get(`https://pokeapi.co/api/v2/pokemon?limit=800`).subscribe((respuesta: any) => {
      console.log('Respuesta de la API', respuesta);
      const requests = respuesta.results.map((item: any) =>
        this.RestService.get(item.url).toPromise()
      );

      Promise.all(requests).then((responses: any[]) => {
        this.data = responses.map((pokemon: any) => {
          return {
            image: pokemon.sprites.other['official-artwork'].front_default,
            views: pokemon.id,
            name: pokemon.name
          };
        });
        console.log('Data procesada', this.data);
      });
    });
  }

}
