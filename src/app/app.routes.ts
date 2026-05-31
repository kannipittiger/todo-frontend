import { Routes } from '@angular/router';
import { Layout } from '../public/layout/layout';
import { TodoPage } from '../pages/todo-page/todo-page';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'todo', pathMatch: 'full' },
      { path: 'todo', component: TodoPage },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./../login/login').then((m) => m.Login),
  },
];
