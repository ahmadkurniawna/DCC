import { Component } from '@angular/core';
import { environment } from '../environments/environment'

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls : ['app.component.scss']
})
export class AppComponent {

// public isDirect = false;
public isDirect = true;

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    // {
    //   title: 'List',
    //   url: '/list',
    //   icon: 'list'
    // },
    {
      title: 'Todays News Cliping',
      
      url:'/cliping',
      icon:'bluetooth'
    },
    {
      title:'News by Period & Catagory',
      url:'/catagory',
      icon:'assets/icon/favicon.png'
    },
    {
      title:'Media Insight Dashboard',
      url:'/dashbord'
    },
    {
      title:'About us',
      url:'/list'
    },
    {
      title:'Logout',
      url:'/list'
    }

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    // alert(this.isDirect);
  }

  // siteDirect(){
  //   this.isDirect = true;
  //   // this.isDirect = false;
  // }

////////////////
  user = localStorage.getItem('user')

  logo = {src: ('http://admin.antara-insight.id/asset/images/' + localStorage.getItem('logo')), width: 50, height: 35, alt: localStorage.getItem('user')}
  // url=environment.apiUrl;

  // groupCategoryOption: any[]=[];
  groupCategoryModel='0'; //778

  // subCategoryOption: any[]=[];
  subCategoryModel='All Sub Categroy';

  // groupMediaOption: any[]=[];
  // groupMediaModel='0';

  // subMediaOption: any[]=[];
  // subMediaModel='0';

  // periodModel:string='1';
  // today = new Date();
  periodFromModel :Date //= this.addDays(this.today,-1);
  periodEndModel:Date //= this.today;

  // edited: boolean = false;
  // bsValue: Date = new Date();
  // bsRangeValue: Date[];
  // maxDate = new Date();


  // addDays(date, days) {
  //   var result = new Date(date);
  //   result.setDate(date.getDate() + days);
  //   return result;
  // }









  //////////////////////////////////////////
 


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }





}
