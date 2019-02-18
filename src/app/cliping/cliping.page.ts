import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-cliping',
  templateUrl: './cliping.page.html',
  styleUrls: ['./cliping.page.scss'],
})
export class ClipingPage implements OnInit {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + localStorage.getItem('token') });
  options = { headers: this.headers };

  url=environment.apiUrl;

  articles=[];
  currPage = 0;
  totalRow:number;
  constructor(private http: HttpClient) { }

  scrollLoad(event){
    if (this.articles.length <= this.totalRow){
      this.currPage ++; 
      console.log(this.currPage);  
      this.loadArticles().then((res)=> {
        event.target.complete();
      });
    }    
  }

  loadArticles(){
    let editingParam={
      "category_set":"0",
      "category_id":"all",
      "user_media_type_id":4095,
      "media_id":0,
      "start_date":"2019-02-17",
      "end_date":"2019-02-18",
      "maxSize":10,
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

  ngOnInit() {
    this.loadArticles();
  }

}
