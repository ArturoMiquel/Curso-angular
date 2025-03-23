import { RestService } from './../rest.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-detail',
  imports: [CommonModule, HeaderComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  public respuesta: any; 
  public comentarios: any = [];
  comentarioText: string = '';
  public form: FormGroup = new FormGroup({});

  constructor(private route: ActivatedRoute, private RestService: RestService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cargarData(params['variable']);

      this.cargarData(params['variable'])
      this.cargarComentarios();
    });
    this.form = this.formBuilder.group({
      textAreaComentario: ['']
    });
  }

  cargarData(id: string) {
    this.RestService.get(`https://pokeapi.co/api/v2/pokemon/${id}`).subscribe(respuesta => {
      console.log('Respuesta de la API', respuesta);
      this.respuesta = respuesta;
    });
  }

  cargarComentarios(){
    this.RestService.get(`http://localhost:4200/comments`)
      .subscribe(respuesta => {
          this.comentarios = respuesta;
      } )
  }

  public enviarData(){
    this.RestService.post(`http://localhost:4200/comments`,
     {
       text:this.form.value.textAreaComentario
     }
    )
    .subscribe(respuesta => {
      console.log('Comentario enviado!!!');
      this.form.reset();
      this.cargarComentarios();
      
    })
}
}
