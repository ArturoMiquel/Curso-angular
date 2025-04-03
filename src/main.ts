import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { AboutComponent } from './app/about/about.component';
import { PostDetailComponent } from './app/post-detail/post-detail.component';
import { ListViewsComponent } from './app/list-views/list-views.component';
import { LoginComponent } from './app/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { VigilanteGuard } from './app/vigilante.guard';

const routes = [
  {path: '', component: HomeComponent,canActivate: [VigilanteGuard]},
  {path: 'about', component: AboutComponent},
  {path: 'post/:variable', component: PostDetailComponent,canActivate: [VigilanteGuard]},
  {path: 'post/:textAreaComentario', component: PostDetailComponent,canActivate: [VigilanteGuard]},
  {path: 'list-videos', component: ListViewsComponent,canActivate: [VigilanteGuard]},
  {path: 'login', component : LoginComponent}
];

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideRouter(routes),CookieService]
}).catch(err => console.error(err));


