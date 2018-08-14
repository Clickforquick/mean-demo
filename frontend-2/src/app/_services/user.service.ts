import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { User } from '../_models/index';

@Injectable()
export class UserService {

    baseUri = 'http://localhost:3000';
    getUsersUri = this.baseUri + '/users';
    createUsersUri = this.baseUri + '/users/register';



    constructor(private http: Http) { }

    getAll() {
        return this.http.get(this.getUsersUri, this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post(this.createUsersUri, user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let urrentUser = JSON.parse(Cookie.get('currentUser'));

        if (urrentUser && urrentUser.token) {
            let headers = new Headers({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'x-access-token': currentUser.token
            });

            // let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}