import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AppService} from 'src/app/app.service'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [AppService]
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule',
    canActivate: [AppService]
  },
  
  { 
  path: 'login', 
  loadChildren: './login/login.module#LoginPageModule',
  // canActivate: [AppService]
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
