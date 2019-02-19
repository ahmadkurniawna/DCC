import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.page.html',
  styleUrls: ['./article-details.page.scss'],
})
export class ArticleDetailsPage implements OnInit {
  article=[];
  constructor(public modalController : ModalController, public navParam : NavParams) { 
    this.article = this.navParam.get('res');
    console.log(this.article);
  }

  ngOnInit() {
    console
  }

  dismiss(){
    this.modalController.dismiss();
  }
}
