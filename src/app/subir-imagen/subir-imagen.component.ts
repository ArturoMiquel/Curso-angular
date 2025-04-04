import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; 
import { RestService } from '../rest.service';

@Component({
  selector: 'app-subir-imagen',
  imports: [HeaderComponent, SidebarComponent, CommonModule], 
  templateUrl: './subir-imagen.component.html',
  styleUrl: './subir-imagen.component.css'
})
export class SubirImagenComponent implements OnInit {

  public archivos: any = [];
  public loading: boolean = false; // Add loading property

  constructor(private sanitizer: DomSanitizer, private rest: RestService) { }

  ngOnInit(): void {
    
  }

imagePreview: any;

onImageSelected($event: Event): any {
  const archivoCapturado = ($event.target as HTMLInputElement).files?.[0];
  this.extraerBase64(archivoCapturado).then((imagen: any) => {
    this.imagePreview = imagen.base;
  });
  this.archivos.push(archivoCapturado);


}

extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
  try {
    const unsafeImg = window.URL.createObjectURL($event);
    const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
    const reader = new FileReader();
    reader.readAsDataURL($event);
    reader.onload = () => {
      resolve({
        blob: $event,
        image,
        base: reader.result
      });
    };
    reader.onerror = error => {
      reject({
        blob: $event,
        image,
        base: null,
        error
      });
    };
  } catch (error) {
    reject({ error });
  }
});

subirImagen(): any {
  try {
    this.loading = true; // Set loading to true when upload starts

    if (this.archivos.length === 0) {
      console.error('No hay archivos para subir.');
      return;
    }    

    const archivo = this.archivos[0];
    this.extraerBase64(archivo).then((imagenBase64: any) => {
      const data = {
        id: new Date().getTime(), // Generar un ID único
        nombre: archivo.name,
        tipo: archivo.type,
        imagen: imagenBase64.base // Imagen codificada en Base64
      };

      console.log('Datos a enviar:', data); // Log para depuración

      this.rest.post('http://localhost:3000/upload', data).subscribe(
        (res: any) => {
          console.log('Imagen subida con éxito:', res);
          this.loading = false; // Set loading to false when upload completes
        },
        (error: any) => {
          console.error('Error al subir la imagen:', error);
          this.loading = false; // Set loading to false on error
        }
      );
    });
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    this.loading = false; // Set loading to false on error
  }
}
}
