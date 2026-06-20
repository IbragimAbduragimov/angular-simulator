import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [

  { 
    path: '',
    component: HomePageComponent 
  },
  {
    path: 'users',
    loadComponent: () => import('./users-page/users-page.component').then((m) => m.UsersPageComponent),
    children: [
      {
        path: 'card',
        loadComponent: () => import('./user-card/user-card.component').then((m) => m.UserCardComponent)
      },
      {
        path:'create',
        loadComponent: () => import('./user-create/user-create.component').then((m) => m.UserCreateComponent)
      },
      {
        path: '',
        loadComponent: () => import('./users-filter/users-filter.component').then((m) => m.UsersFilterComponent)
      }
    ],
  },
  {
    path: 'header',
    loadComponent: () => import('./header/header.component').then((m) => m.HeaderComponent)
  },
  {
    path: 'footer',
    loadComponent: () => import('./footer/footer.component').then((m) => m.FooterComponent)
  },
  {
    path: 'loader',
    loadComponent: () => import('./loader/loader.component').then((m) => m.LoaderComponent)
  },
  {
    path: 'message',
    loadComponent: () => import('./message/message.component').then((m) => m.MessageComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent)
  }

];