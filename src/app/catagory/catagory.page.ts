import { Component,Inject } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { NgProgress,NgProgressRef } from '@ngx-progressbar/core'
// import { navItems } from './../../_nav';
import { environment } from '../../environments/environment'
// import { Subscription } from 'rxjs/Subscription';
import { ChildListenerService } from '../../app/child-listener.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-catagory',
  templateUrl: './catagory.page.html',
  styleUrls: ['./catagory.page.scss'],
})
export class CatagoryPage{
  // urlenv = environment.apiUrl;
  user = localStorage.getItem('user')

  logo = {src: ('http://admin.antara-insight.id/asset/images/' + localStorage.getItem('logo')), width: 50, height: 35, alt: localStorage.getItem('user')}
  url=environment.apiUrl;

  groupCategoryOption: any[]=[];
  groupCategoryModel='778';

  subCategoryOption: any[]=[];
  subCategoryModel='All Sub Categroy';

  groupMediaOption: any[]=[];
  groupMediaModel='0';

  subMediaOption: any[]=[];
  subMediaModel='0';

  periodModel:string='1';
  today = new Date();
  periodFromModel :Date = this.addDays(this.today,-1);
  periodEndModel:Date = this.today;

  edited: boolean = false;
  bsValue: Date = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
 
  // public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;

  progressRef: NgProgressRef
  
  // parentSubject:Subject<any> = new Subject();

  notifyChildren() {
    this.childListener.notifyOther({option: 'call_child', value: 'From child'});
  }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + localStorage.getItem('token') });
  options = { headers: this.headers };

  addDays(date, days) {
    var result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
  }

  logOutHandler(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  
  onChange(deviceValue) {
    if(deviceValue == 1){      
      // console.log(this.addDays(this.today,-1));
      this.periodFromModel = this.addDays(this.today,-1);
      this.periodEndModel = this.today; 
      this.edited = false;
    }else if(deviceValue==2){
      this.periodFromModel = this.addDays(this.today,-7);
      this.periodEndModel = this.today; 
      this.edited = false;
    }else if(deviceValue==3){
      this.periodFromModel = this.addDays(this.today,-30);
      this.periodEndModel = this.today;
      this.edited = false;
    }else if(deviceValue==4){
      this.periodFromModel = this.addDays(this.today,-360);
      this.periodEndModel = this.today;
      this.edited = false;
    }else if(deviceValue==5){
      this.edited = true;  
    }
  }
  
  onGroupCategoryChange(groupCategoryValue){
    this.getSubCategory();
  }
  constructor(private http: HttpClient,public progress: NgProgress,private childListener: ChildListenerService,private router: Router) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

  // onGroupMediaChange(groupMediaValue){
  //   this.getSubMedias();
  // }

  // getGroupCategory(){
  //   interface UserResponse {
  //     data: Object;
  //   }
  //   //group category
  //   this.http.get<UserResponse>(this.url + 'user/categories/',this.options)
  //     .subscribe((result: any) => {
  //       // console.log(result);
  //       this.groupCategoryOption = result.results;
  //       this.groupCategoryOption.unshift({'client_id':result.results[0].client_id,'category_set':'0','descriptionz':'All Group Category','usere':result.results[0].usere,'input_data_date':result.results[0].input_data_date,'pc_name':result.results[0].pc_name});
  //       // console.log(JSON.stringify(this.groupCategoryOption));
  //       this.groupCategoryModel=this.groupCategoryOption[0].category_set;
  //     });
  // }

  getSubCategory() {
    interface UserResponse {
      data: Object;
    }
    let urlExtend='user/subcategories/' + this.groupCategoryModel;
    if (this.groupCategoryModel == '0'){
      this.subCategoryOption = [{'client_id':'sdads','category_set':'0','category_id':'All Sub Categroy','default_set':'','usere':'dasda','input_data_date':null,'pc_name':null}];      
      this.subCategoryModel = this.subCategoryOption[0].category_id;
    }else{
      this.http.get<UserResponse>(this.url + urlExtend,this.options)
      .subscribe((result: any) => {
        this.subCategoryOption = result.results;            
        
        // console.log(JSON.stringify(this.subCategoryOption));
        if (this.subCategoryOption.length <1){         
          this.subCategoryOption.unshift({'client_id':this.subCategoryOption[0].client_id,'category_set':'0','category_id':'No Sub Categroy','default_set':'','usere':this.subCategoryOption[0].usere,'input_data_date':this.subCategoryOption[0].input_data_date,'pc_name':this.subCategoryOption[0].pc_name});                      
        }else{          
          this.subCategoryOption.unshift({'client_id':this.subCategoryOption[0].client_id,'category_set':'0','category_id':'All Sub Categroy','default_set':'','usere':this.subCategoryOption[0].usere,'input_data_date':this.subCategoryOption[0].input_data_date,'pc_name':this.subCategoryOption[0].pc_name});      
        }
        this.subCategoryModel = this.subCategoryOption[0].category_id;
      });
    }    
  }

  // getMediaGroup() {
  //   interface UserResponse {
  //     data: Object;
  //   }
  //   this.http.get<UserResponse>(this.url + 'user/medias/',this.options)
  //   .subscribe((result: any) => {
  //     this.groupMediaOption = result.results;    
  //     // console.log(JSON.stringify(this.groupMediaOption))
  //     // this.groupMediaOption.unshift({"client_id":"niyee","user_media_type_id":"0","user_media_type_name_def":"All Group Media","input_data_date":"2018-10-22T15:06:49","pc_name":"web-api-2","usere":"1525055182"});
  //     this.groupMediaModel = this.groupMediaOption[0].user_media_type_id;
  //   });
  // }

  // getSubMedias(){
  //   interface UserResponse {
  //     data: Object;
  //   }
  //   this.http.get<UserResponse>(this.url + 'user/submedias/' + this.groupMediaModel,this.options)
  //   .subscribe((result: any) => {
  //     this.subMediaOption = result.results;      
  //     // console.log(JSON.stringify(this.subMediaOption));
  //     if (this.subMediaOption.length <1){
  //       if(this.groupMediaModel=='0'){
  //         this.subMediaOption.unshift({"media_id":0,"media_name":"All Sub Media","media_type_id":1,"circulation":35700,"rate_bw":117000,"rate_fc":195000,"language":"IND","statuse":"A","usere":"1","pc_name":"","input_date":"2012-11-22T11:05:42Z","tier":2});
  //       }else{
  //         this.subMediaOption.unshift({"media_id":0,"media_name":"No Sub Media","media_type_id":1,"circulation":35700,"rate_bw":117000,"rate_fc":195000,"language":"IND","statuse":"A","usere":"1","pc_name":"","input_date":"2012-11-22T11:05:42Z","tier":2});
  //       }
  //     }else{
  //       this.subMediaOption.unshift({"media_id":0,"media_name":"All Sub Media","media_type_id":1,"circulation":35700,"rate_bw":117000,"rate_fc":195000,"language":"IND","statuse":"A","usere":"1","pc_name":"","input_date":"2012-11-22T11:05:42Z","tier":2});
  //     }
  //     this.subMediaModel = this.subMediaOption[0].media_id;
  //   });
  // }

  ngOnInit(): void {
    // this.progressRef = this.progress.ref();

    // this.progressRef.start();
    //group category
    // this.getGroupCategory();

    //sub category
    this.getSubCategory();    

    //get media
    // this.getMediaGroup();

    //get submedia
    //this.getSubMedias();

    // this.progressRef.complete();
  } 
}
