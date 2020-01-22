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
	 * Get users from github.
	 * May return HttpErrorResponse or Error.
	 */
	searchUsers(username: string) : Observable<User[]> {
		const url = `${environment.apiUrl}/search/users?q=${username}`;
		return this.httpClient.get(url)
		.pipe(
			switchMap((result) => {
				try {
					// map the api result into our own object
					return of(this.mapResultToUsers(result));
				} catch(error) {
					const newError = new Error('Data parsing error in searchUsers');
					return throwError(newError);
				}
			})
		);
	}



	/**
	 * Map results into our own User object
	 * @param result Result of searching users from github api
	 */
	private mapResultToUsers(result): User[] {
		const mappedUsers = [];
		
		result.items.forEach((user) => {
			mappedUsers.push({
				login: user.login,
				id: user.id,
				nodeId: user.node_id,
				avatarUrl: user.avatar_url,
				gravatarId: user.gravatar_id,
				url: user.url,
				htmlUrl: user.html_url,
				followersUrl: user.followers_url,
				followingUrl: user.following_url,
				gistsUrl: user.gists_url,
				starredUrl: user.starred_url,
				subscriptionsUrl: user.subscriptions_url,
				organizationsUrl: user.organizations_url,
				reposUrl: user.repos_url,
				eventsUrl: user.events_url,
				receivedEventsUrl: user.received_events_url,
				type: user.type,
				siteAdmin: user.site_admin,
				name: user.name,
				company: user.company,
				blog: user.blog,
				location: user.location,
				email: user.email,
				hireable: user.hireable,
				bio: user.bio,
				publicRepos: user.public_repos,
				publicGists: user.public_gists,
				followers: user.followers,
				following: user.following,
				createdAt: new Date(user.created_at),
				updatedAt: new Date(user.updated_at)
			});
		});

		return mappedUsers;
	}
	
}
