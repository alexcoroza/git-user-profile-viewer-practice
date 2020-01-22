import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { of, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { searchUsersMockData }  from '../mock-data/search-users';
import { UserService } from './user.service';

describe('UserService', () => {
	let service: UserService;
	
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientModule
			],
			providers: [
				HttpClient
			]
		})

		service = TestBed.get(UserService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});


	describe('searchUsers', () => {
		let httpGetSpy;

		beforeEach(() => {
			httpGetSpy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of(searchUsersMockData));
		});

		it('should return User[] if theres no error', (done) => {
			service.searchUsers(null)
			.subscribe((users) => {
				expect(users).toBeDefined();
				done();
			});
		});

		it('should return an Error if theres an error in parsing the result', (done) => {
			httpGetSpy.and.returnValue(of('some unknown data that cannot be parsed'));
			service.searchUsers('alex')
			.pipe(
				catchError((error) => {
					expect(error.message).toEqual('Data parsing error in searchUsers');
					done();
					return EMPTY;
				})
			).subscribe();
		});
	});
	
	
});
