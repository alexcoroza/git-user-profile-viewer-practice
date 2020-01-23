import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-user-profiles-page',
	templateUrl: './user-profiles-page.component.html',
	styleUrls: ['./user-profiles-page.component.scss']
})
export class UserProfilesPageComponent implements OnInit {

	subscriptions: Subscription[] = [];
	users: User[] = [];
	
	userProfileSearcherForm = this.formBuilder.group({
		username: ['']
	});
	
	constructor(
		private userService: UserService,
		private formBuilder: FormBuilder
	) { }


	ngOnInit() {
	}


	ngOnDestroy() {
		this.subscriptions.forEach((subscription) => {
			subscription.unsubscribe();
		});
	}


	searchUser() : void {
		const searchParam = this.userProfileSearcherForm.get('username').value;
		const subscription = this.userService.searchUser(searchParam)
		.pipe(
			catchError((error: HttpErrorResponse) => {
				if(error.status === 404) {
					alert('Cannot find git user.');
				} else {
					alert('There is something wrong during lookup.');
				}

				return EMPTY;
			})
		)
		.subscribe((user) => {
			this.users.push(user);
		});

		this.subscriptions.push(subscription);
	}


	/**
	 * Delete a user from this.user via username
	 * @param username username
	 */
	deleteUser(username: string) : void {
		// add implementation here
	}


	/**
	 * Check if a User is already existing in this.users.
	 * Return true if existing, otherwise return false.
	 * @param user User
	 */
	isUserExisting(user: User) : boolean {
		// all implementation here
		return true;
	}
	

}