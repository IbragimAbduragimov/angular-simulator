import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { postResolver } from './features/posts/post.resolver';
import { authGuard } from './features/auth/auth.guard';
import { adminGuard } from './features/auth/admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'posts/create',
    loadComponent: () =>
      import('./features/posts/post-create/post-create.component').then(
        (m) => m.PostCreateComponent,
      ),
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'posts/:id',
    loadComponent: () =>
      import('./features/posts/post-detail/post-detail.component').then(
        (m) => m.PostDetailComponent,
      ),
    canActivate: [authGuard, adminGuard],
    resolve: { post: postResolver },
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./users-page/users-page.component').then((m) => m.UsersPageComponent),
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'posts',
    loadComponent: () =>
      import('./features/posts/posts/posts.component').then((m) => m.PostsComponent),
    canActivate: [authGuard, adminGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent),
  },
];
