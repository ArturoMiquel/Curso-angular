import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { AboutComponent } from './app/about/about.component';
import { PostDetailComponent } from './app/post-detail/post-detail.component';
import { ListViewsComponent } from './app/list-views/list-views.component';

const routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path:'post/:variable', component: PostDetailComponent},
  {path:'post/:textAreaComentario', component: PostDetailComponent},
  {path:'list-videos', component: ListViewsComponent}
];

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideRouter(routes)]
}).catch(err => console.error(err));


