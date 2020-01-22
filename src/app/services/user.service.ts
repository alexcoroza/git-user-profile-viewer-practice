import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';


@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(
		private httpClient: HttpClient
	) { }


	getUsers() : Observable<User> {
		const url = `${environment.apiUrl}/users`;
		return this.httpClient.get<User>(url);
	}
	
}
