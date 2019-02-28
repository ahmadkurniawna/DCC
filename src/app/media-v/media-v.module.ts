import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MediaVPage } from './media-v.page';

const routes: Routes = [
  {
    path: '',
    component: MediaVPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MediaVPage],
  exports: [MediaVPage]
})
export class MediaVPageModule {}
