import { Component, OnInit } from '@angular/core';
import {FormGroup , FormControl , Validators } from '@angular/forms';
import {LoginService} from "./login.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})

export class LoginComponent implements OnInit {

  userForm : FormGroup;
  returnUrl: string ;
  message : any ;

  constructor( private route: ActivatedRoute,
        private router: Router,
        private _loginService : LoginService ) { }

  ngOnInit() {

    this.userForm=new FormGroup(
      {
          username: new FormControl("UserName",Validators.required),
          password: new FormControl("Password",Validators.required)
      }
      
  );
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  
  onSubmit(){
      console.log(this.userForm.value);
      this._loginService.addVideo(this.userForm.value).subscribe(resVideoData =>{
      console.log(resVideoData);
      this.router.navigate([this.returnUrl]);
      },error => {
                   /* this.alertService.error(error);*/
                    this.message = error;
                }
    );
  }

}
