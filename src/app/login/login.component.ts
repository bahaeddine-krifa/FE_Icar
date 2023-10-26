import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { RegisterService } from '../register.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User = new User();
  user1: User = new User();
  showError_login = false;
  showError_signup = false;
  redirectUrl: any = '';
  constructor(private registerService: RegisterService, private router: Router, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.redirectUrl = this.activatedroute.snapshot.queryParamMap.get('redirectUrl') || '/';
  }

  userRegister(){
    console.log(this.user);
    this.registerService.registerUser(this.user).subscribe(data=>{
      alert("successfuly User is register!");
      window.location.reload();
      },error=>{
        this.showError_signup= true;
      setTimeout(() => {
        this.showError_signup= false;
      }, 2000);
      });
  }

  userLogin(){
    
    this.registerService.loginUser(this.user1).subscribe(data=>{
      this.registerService.login().then(() => {
        this.router.navigateByUrl(this.redirectUrl);
      })
      
      
    },error=>{
      this.showError_login= true;
      setTimeout(() => {
        this.showError_login= false;
      }, 2000);
  });

    }


}

