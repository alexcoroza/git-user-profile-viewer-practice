import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';

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


	searchUsers() {
		const searchParam = this.userProfileSearcherForm.get('username').value;
		const subscription = this.userService.searchUsers(searchParam)
		.pipe(
			catchError((error) => {
				alert('There is something wrong during lookup.');
				return EMPTY;
			})
		)
		.subscribe((users) => {
			this.users = users;
		});

		this.subscriptions.push(subscription);
	}
	

}
