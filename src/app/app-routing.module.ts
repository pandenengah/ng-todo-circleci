import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AfterLoginGuard } from './@guards/after-login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule),
    canActivate: [AfterLoginGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
