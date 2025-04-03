import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { CookieService } from 'ngx-cookie-service';
import { RestService } from './../rest.service'; // Corrected path to RestService
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, HttpClientModule], // Agrega HttpClientModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'example-react-form';

  public formLogin!: FormGroup; 

  constructor(private formBuilder: FormBuilder,private RestService: RestService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]      
    });
    this.loadAPI(); // Load API data into the form
  }

  loadAPI(): any {
    const response = {
      email:'artur.trombo@gmail.com',
      password:'123456'
    };
    this.formLogin.patchValue(response); // Use patchValue to set form values
  }

  send(): any {
          console.log(this.formLogin?.value);
      }

  enviarDatos(): any {
    const { email, password } = this.formLogin.value; // Extrae email y password del formulario
    this.RestService.get(`http://localhost:3000/users?email=${email}`).subscribe(
      (users: any[]) => {
        if (users.length > 0 && users[0].password === password) { // Verifica si el usuario existe y la contraseña coincide
          const response = { token: 'dummy-token' }; // Genera un token ficticio (puedes reemplazarlo con lógica real)
          this.cookieService.set('token_access', response.token, 1, '/');
          this.router.navigate(['']);
        } else {
          const mensajeDiv = document.querySelector('.mensaje');
          if (mensajeDiv) {
            mensajeDiv.textContent = 'El usuario no existe o la contraseña es incorrecta';
          }
          console.error('El usuario no existe o la contraseña es incorrecta'); // Mensaje si el usuario no existe o la contraseña no coincide
        }
      },
      (error) => {
        console.error('Error al comprobar el usuario:', error); // Manejo de errores en la verificación
      }
    );
  }
}
