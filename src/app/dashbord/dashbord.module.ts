import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ChartsModule } from 'ng2-charts';


import { DashbordPage } from './dashbord.page';
// import { DashbordPageRoutingModule } from './dashbord.router.module'
import { MediaVPageModule } from '../media-v/media-v.module'

const routes: Routes = [
  {
    path: '',
    component: DashbordPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    // DashbordPageRoutingModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    // MediaVPageModule
    ChartsModule
  ],
  declarations: [DashbordPage]
})
export class DashbordPageModule {}
