import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Component, OnInit,Inject } from '@angular/core';
//import { DefaultLayoutComponent } from '../../containers/default-layout/default-layout.component'

// import {environment} from '../../environments/environment'
// import { from } from 'rxjs';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';

import { LoginPage } from './login.page';


const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
    // HttpClient
  ],
  declarations: [LoginPage]
})


export class LoginPageModule {}

