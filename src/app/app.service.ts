import { Injectable } from '@angular/core';

import { CanActivate } from '@angular/router';
import { Router,ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {environment} from '../environments/environment'


// @Injectable({
//   providedIn: 'root'

// })
// export class AppService {

//   constructor() { }
// }


@Injectable()
export class AppService implements CanActivate{

  constructor(private router: Router,private http: HttpClient) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
    // console.log(localStorage.getItem('token')) 
    if (localStorage.getItem('token') == undefined || localStorage.getItem('token') == '') {
      // console.log("masuk") 
      this.router.navigateByUrl('/login');  
      return false;
    }else{
      return true;
    }   
  }
}
