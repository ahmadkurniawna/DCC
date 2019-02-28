import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ModalController } from '@ionic/angular';
import { ArticleDetailsPage } from '../article-details/article-details.page'
import { Router } from '@angular/router';
import { moment } from 'ngx-bootstrap/chronos/test/chain';
import { AppComponent } from '../app.component'
import { Subscription } from 'rxjs';
import { ChildListenerService } from '../child-listener.service';

import { CatagoryPage } from '../catagory/catagory.page';
import { createOfflineCompileUrlResolver } from '@angular/compiler';

@Component({
  selector: 'app-cliping',
  templateUrl: './cliping.page.html',
  styleUrls: ['./cliping.page.scss']
  // providers: [CatagoryPage]
})
export class ClipingPage implements OnInit {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + localStorage.getItem('token')
  });
  options = { headers: this.headers };

  url = environment.apiUrl;

  isDirect: boolean = false;

  private subscription: Subscription;

  groupCategoryModel='0';
  subCategoryModel='All Sub Categroy'
  periodFromModel:Date
  periodEndModel:Date

  pageSize: number = 20;
  articles = [];
  currPage = 0;
  totalRow: number;
  
  // constructor(private http: HttpClient,public modalCtrl: ModalController,private router: Router) { }
  constructor( public modalCtrl: ModalController, private http: HttpClient, private router: Router, private childListener: ChildListenerService, private parent: AppComponent) {}
 

  

  scrollLoad(event) {
    if (this.articles.length <= this.totalRow) {
      this.currPage++;
      console.log(this.currPage);
      this.loadArticles().then((res) => {
        event.target.complete();
      });
    }
  }

  async openModal(article) {
    const myModal = await this.modalCtrl.create({
      component: ArticleDetailsPage,
      componentProps: { res: article }
    });
    await myModal.present();
  }


  getItems(searchbar){
    this.loadArticles();
    var q = searchbar.Content;

    console.log('ini dari search = ' + q);

    // if the value is an empty string don't filter the items
    if (q.trim() == '') {
      return;
    }

     // if the value is an empty string don't filter the items
     if (q && q.trim() != '') {
      this.articles = this.articles.filter((item) => {
        return (item.toLowerCase().indexOf(q.toLowerCase()) > -1);
      })
    }

  }


  loadArticles() {
    let editingParam = {
      "category_set": this.groupCategoryModel,
      "category_id": this.subCategoryModel == 'All Sub Categroy' ? 'all' : this.subCategoryModel,
      "start_date":(moment(this.periodFromModel).format('YYYY-MM-DD')).toString(),
      "end_date":(moment(this.periodEndModel).format('YYYY-MM-DD')).toString(),  
        "maxSize": this.pageSize,
      "page": this.currPage,
      "order_by": "datee",
      "order": "desc"
    };

    return new Promise((resolve, reject) => {
      interface UserResponse {
        data: Object;
      }

      this.http.post<UserResponse>(this.url + 'user/editing/', editingParam, this.options)
        .subscribe((result: any) => {
          console.log(result);
          for (let i = 0; i < result.data.length; i++) {
            this.articles.push(result.data[i]);
          }
          this.totalRow = result.recordsTotal;
          resolve(this.articles);
        }, (err: any) => {
        });
    });
  }


  goToHome() {
    this.router.navigateByUrl('/home');
  }

  addDays(date, days) {
    var result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
  }

  ngOnInit() {
    console.log('ini dari On init : ' + this.parent.isDirect);
    var today = new Date;
    
    if (this.parent.isDirect == true) {
      console.log('masuk true')
      this.groupCategoryModel = '0'
      this.subCategoryModel = 'All Sub Categroy';
      this.periodFromModel = this.addDays(today,-1);
      this.periodEndModel = today;

      this.loadArticles();
    } else {
      console.log('masuk false')
      this.groupCategoryModel = this.parent.groupCategoryModel
      this.subCategoryModel = this.parent.subCategoryModel
      this.periodFromModel = this.parent.periodFromModel
      this.periodEndModel = this.parent.periodEndModel;
    this.loadArticles();
      // this.subscription = this.childListener.notifyObservable$.subscribe((res) => {
      //   if (res.hasOwnProperty('option') && res.option === 'call_child') {
      //     console.log(res.value);
      //     // this.loadData();
      //     this.loadArticles();

      //   }
      // });
    }
  }
}
