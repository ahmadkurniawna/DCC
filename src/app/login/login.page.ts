import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { environment } from '../../environments/environment'






@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = "";
  password: string = "";
  clients: any;
  showSelected = false;
  msg: string;
  url = environment.apiUrl;

  // constructor() { }
  constructor(private http: HttpClient, private router: Router) { }


  signIn() {
    let fd = {
      username: this.username,
      password: this.password
    };

    interface UserResponse {
      data: Object;
    }
    this.http.post<UserResponse>(this.url + 'login/', fd)
      .subscribe(result => {
        //this.clients = result;
        //console.log(result)
        this.clients = result;
      
      if (this.clients.code != '401'){
        localStorage.setItem('user', this.clients.usr_comp_login);
        localStorage.setItem('token', this.clients.token);
        localStorage.setItem('client', this.clients.client_id);
        localStorage.setItem('logo', this.clients.comp_icon);
        this.router.navigateByUrl('/home');
      }else{
        this.msg = this.clients.message;
        
        this.showSelected  = true;
      }
      }, error => {
        this.msg = JSON.stringify(error.json());
        
        this.showSelected  = true;
      })
    }
              
      
  ngOnInit() {
  }

}
