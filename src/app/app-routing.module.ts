import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

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
  },
  { path: 'cliping', loadChildren: './cliping/cliping.module#ClipingPageModule' },
  { path: 'catagory', loadChildren: './catagory/catagory.module#CatagoryPageModule' },
  { path: 'dashbord', loadChildren: './dashbord/dashbord.module#DashbordPageModule' },
  { path: 'article-details', loadChildren: './article-details/article-details.module#ArticleDetailsPageModule' },
  { path: 'by-category', loadChildren: './by-category/by-category.module#ByCategoryPageModule' },
  // { path: 'media-v', loadChildren: './media-v/media-v.module#MediaVPageModule' }

  
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
//   ],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}