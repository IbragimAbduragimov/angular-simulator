import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { postResolver } from './features/posts/post.resolver';

export const routes: Routes = [

  { 
    path: '',
    component: HomePageComponent 
  },
  {
    path: 'posts/create',
    loadComponent: () => import('./features/posts/post-create/post-create.component').then((m) => m.PostCreateComponent),
  },
  {
    path: 'posts/:id',
    loadComponent: () => import('./features/posts/post-detail/post-detail.component').then((m) => m.PostDetailComponent),
    resolve: { post: postResolver}
  },
  {
    path: 'users',
    loadComponent: () => import('./users-page/users-page.component').then((m) => m.UsersPageComponent),
  },
  {
    path: 'posts',
    loadComponent: () => import('./features/posts/posts/posts.component').then((m) => m.PostsComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent)
  },

];