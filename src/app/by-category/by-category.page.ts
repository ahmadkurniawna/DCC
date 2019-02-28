import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { ModalController } from '@ionic/angular';
import { ArticleDetailsPage } from '../article-details/article-details.page'
import { Router } from '@angular/router';
import { ChildListenerService } from '../child-listener.service';  
import{ CatagoryPage } from '../catagory/catagory.page';
import { moment } from 'ngx-bootstrap/chronos/test/chain';
import { AppComponent } from '../app.component'


@Component({
  selector: 'app-by-category',
  templateUrl: './by-category.page.html',
  styleUrls: ['./by-category.page.scss'],
  providers: [CatagoryPage]
})
export class ByCategoryPage implements OnInit {





  private subscription: Subscription;




  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + localStorage.getItem('token') });
  options = { headers: this.headers };

  url=environment.apiUrl;

  pageSize:number=20;
  articles=[];
  currPage = 0;
  totalRow:number;
  constructor(private parent: AppComponent,private CatagoryPage: CatagoryPage,private http: HttpClient,public modalCtrl: ModalController,private router: Router, private childListener: ChildListenerService) { }

  scrollLoad(event){
    if (this.articles.length <= this.totalRow){
      this.currPage ++; 
      console.log(this.currPage);  
      this.loadArticles().then((res)=> {
        event.target.complete();
      });
    }    
  }

  async openModal(article){
    const myModal = await this.modalCtrl.create({
      component:ArticleDetailsPage,
      componentProps: {res:article}
    });
    await myModal.present();
  }

  loadArticles(){
    let editingParam={
      "category_set":this.CatagoryPage.groupCategoryModel,
      "category_id":this.CatagoryPage.subCategoryModel=='All Sub Categroy'?'all':this.CatagoryPage.subCategoryModel,
      "user_media_type_id":this.CatagoryPage.groupMediaModel,
      "media_id":this.CatagoryPage.subMediaModel,
      // "start_date":(moment(this.parent.periodFromModel).format('YYYY-MM-DD')).toString(),
      // "end_date":(moment(this.parent.periodEndModel).format('YYYY-MM-DD')).toString(),   
      "start_date":(moment(this.CatagoryPage.periodFromModel).format('YYYY-MM-DD')).toString(),
      "end_date":(moment(this.CatagoryPage.periodEndModel).format('YYYY-MM-DD')).toString(),
      "maxSize":this.pageSize,
      "page":this.currPage,
      "order_by":"datee",
      "order":"desc"
    };

    return new Promise((resolve, reject) => {
      interface UserResponse {
        data: Object;
      }      
    
      this.http.post<UserResponse>(this.url +'user/editing/',editingParam,this.options)
      .subscribe((result: any) => {            
        console.log(result);
        for (let i =0; i < result.data.length; i++){
          this.articles.push(result.data[i]);


        }
        this.totalRow = result.recordsTotal;
        resolve(this.articles);
      },(err:any)=>{
      }); 
    });
  }


  goToHome(){
    this.router.navigateByUrl('/catagory');
  }


  ngOnInit() {

    this.CatagoryPage.groupCategoryModel = this.parent.groupCategoryModel
    this.CatagoryPage.subCategoryModel = this.parent.subCategoryModel
    this.CatagoryPage.periodFromModel = this.parent.periodFromModel
    this.CatagoryPage.periodEndModel = this.parent.periodEndModel;

    this.loadArticles();



  //  this.subscription = this.childListener.notifyObservable$.subscribe((res) => {
  //     if (res.hasOnProperty('option') && res.option == 'call_child'){
  //       // console.log(res.value);
  //       // console        
  //       // this.loadArticles();
  //     }
  //     // else if (res.hasOnProperty('option') && res.option === 'call_child') {
  //     //   console.log('data masuk ' + JSON.stringify(res.value.article_id));
  //       // for(let i=0; i<this.editinglist.data.length; i++){
  //       //   consule.log(this.editingList.data[i].article_id)
  //       //   if(this.editingList.data[i].article_id == res.value.article_id){
  //       //     this.editingList.data[i].categories = res.value.categories;
  //       //   }
  //       // }
  //     // }
  //   })
  }

}
