import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

// Define la interfaz DataModel
interface DataModel {
  text: string;
  url: string;
}

@Component({
  selector: 'app-prueba-dom',
  imports: [],
  templateUrl: './prueba-dom.component.html',
  styleUrl: './prueba-dom.component.css'
})
export class PruebaDomComponent implements OnInit {
  @ViewChild('asTitle') title!: ElementRef;
  @ViewChild('asImage') image!: ElementRef; 

  public data: DataModel | undefined;

  constructor(private renderer2: Renderer2) { }

  ngOnInit(): void {
    this.data = {
      text: 'Hola mundo',
      url: 'assets/image/International_Pokemon_logo.png'
    };
  }

  change(event: Event): void {
    event.preventDefault();

    if (this.image && this.image.nativeElement) {
      const asImage = this.image.nativeElement;
      this.renderer2.setAttribute(asImage, 'src', 'assets/image/imageNotFound.jpg');
    } else {
      console.error('La referencia "image" no está disponible.');
    }

    if (this.title && this.title.nativeElement) {
      const asTitle = this.title.nativeElement;
      this.renderer2.setStyle(asTitle, 'color', 'red');
      this.renderer2.setStyle(asTitle, 'font-size', '50px');
      this.renderer2.setStyle(asTitle, 'background-color', 'blue');
      console.log(asTitle);
    } else {
      console.error('La referencia "title" no está disponible.');
    }
  }
}