import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
		username: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]]
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
			this.addNewUser(user);
		});

		this.subscriptions.push(subscription);
	}


	addNewUser(newUser: User): void {
		if(this.users.length === 0 || this.isUserExisting(newUser) === false) {
			this.users.push(newUser);
		}
	}


	/**
	 * Delete a user from this.user via username
	 * @param username username
	 */
	deleteUser(username: string) : void {
		// add implementation here
	}


	/**
	 * Sort this.users by the property name provided.
	 * @param propertyName User property that will be used to sort the this.users
	 */
	sortUsers(propertyName: string) : void {
		// add implementation here
	}


	/**
	 * Check if a User is already existing in this.users.
	 * Return true if existing, otherwise return false.
	 * @param user User
	 */
	isUserExisting(user: User) : boolean {
		let existing: boolean = false;
		
		this.users.forEach((existingUser: User) => {
			if(existingUser.id === user.id) {
				existing = true;
			}
		});

		return existing;
	}
	

}
