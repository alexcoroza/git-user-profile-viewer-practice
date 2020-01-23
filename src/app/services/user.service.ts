import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';


@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(
		private httpClient: HttpClient
	) { }


	/**
	 * Get a user from github using username.
	 */
	searchUser(username: string) : Observable<User> {
		const url = `${environment.apiUrl}/users/${username}`;
		return this.httpClient.get(url)
		.pipe(
			switchMap((result) => {
				try {
					// map the api result into our own object
					return of(this.mapResultToUser(result));
				} catch(error) {
					const newError = new Error('Data parsing error in searchUser');
					return throwError(newError);
				}
			})
		);
	}



	/**
	 * Map searchUser api result into User
	 * @param data any object
	 */
	private mapResultToUser(data) : User {
		return {
			login: data.login,
			id: data.id,
			nodeId: data.node_id,
			avatarUrl: data.avatar_url,
			gravatarId: data.gravatar_id,
			url: data.url,
			htmlUrl: data.html_url,
			followersUrl: data.followers_url,
			followingUrl: data.following_url,
			gistsUrl: data.gists_url,
			starredUrl: data.starred_url,
			subscriptionsUrl: data.subscriptions_url,
			organizationsUrl: data.organizations_url,
			reposUrl: data.repos_url,
			eventsUrl: data.events_url,
			receivedEventsUrl: data.received_events_url,
			type: data.type,
			siteAdmin: data.site_admin,
			name: data.name,
			company: data.company,
			blog: data.blog,
			location: data.location,
			email: data.email,
			hireable: data.hireable,
			bio: data.bio,
			publicRepos: data.public_repos,
			publicGists: data.public_gists,
			followers: data.followers,
			following: data.following,
			createdAt: new Date(data.created_at),
			updatedAt: new Date(data.updated_at)
		};
	}
	
}
