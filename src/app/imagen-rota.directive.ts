import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appImagenRota]'
})
export class ImagenRotaDirective implements OnInit {
  @Input() urlCustom: string = '';
  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    
    const img = this.elementRef.nativeElement;
    console.log('img', img);
  }


  @HostListener('error') 
  cargarImagenPorDefecto() {
    const img: HTMLImageElement = this.elementRef.nativeElement;
    img.src = this.urlCustom || 'assets/image/imageNotFound2.jpg';
  }
}
