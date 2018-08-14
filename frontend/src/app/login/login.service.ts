import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import 'rxjs/add/operator/map';
import { Router } from "@angular/router";

@Injectable()
export class LoginService {

  private token: any;
  private _getUrl = "http://localhost:3000/users/";
  private _postUrl = "http://localhost:3000/users/login";
  // private _postUrl = "/users/login";
  private _putUrl = "/api/video/";
  private _deleteUrl = "/api/video/";
  constructor(private _http: Http, private router: Router) { }

  cook() {

    console.log("ttt");
    console.log(Cookie.get('cookieName'));
    console.log(Cookie.get('currentUser'));
    return this._http.get("/users/coo").map((response: Response) => response.json());
  }

  getVideos() {
    let token = JSON.parse(localStorage.getItem('currentUser')).token;
    debugger
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': token
    });
    // headers.set({});
    // headers('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    // headers('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    let options = new RequestOptions({ headers: headers });

    return this._http.get(this._getUrl, options).map((response: Response) => response.json());
  }


  addVideo(user) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    // headers.set({});
    // headers('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    // headers('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    let options = new RequestOptions({ headers: headers });

    return this._http.post(this._postUrl, JSON.stringify(user), options)
      .map((response: Response) => {
        let user = response.json();
        if (user && user.token) {
          //session Only exist in same tab
          sessionStorage.setItem('currentUser', JSON.stringify(user));

          //all tabs&windows of same browser store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          Cookie.set('currentUser', JSON.stringify(user));
        }
        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    Cookie.delete('currentUser');
    this.router.navigate(['/login']);
  }
  /*
  updateVideo(video : Video){
  let headers = new Headers ({'Content-Type':'application/json'});
  let options = new RequestOptions({headers: headers});
  
    return this._http.put(this._putUrl+video._id ,JSON.stringify(video),options)
    .map((response : Response ) => response.json());
  }
  
  deleteVideo(video : Video){
  let headers = new Headers ({'Content-Type':'application/json'});
  let options = new RequestOptions({headers: headers});
  
    return this._http.delete(this._deleteUrl+video._id)
    .map((response : Response ) => response.json());
  }
  */

}
