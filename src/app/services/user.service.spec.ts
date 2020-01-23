import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { of, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { searchUserByUsernameMockData }  from '../mock-data/search-user-by-username';
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


	describe('searchUser', () => {
		let httpGetSpy, alertSpy;

		beforeEach(() => {
			alertSpy = spyOn(window, 'alert')
			httpGetSpy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of(searchUserByUsernameMockData));
		});

		it('should return User if theres no error', (done) => {
			service.searchUser(null)
			.subscribe((user) => {
				expect(user).toBeDefined();
				done();
			});
		});

		it('should return an Error if theres an error in parsing the result', (done) => {
			httpGetSpy.and.returnValue(of('some unknown data that cannot be parsed'));
			service.searchUser('alex')
			.pipe(
				catchError((error) => {
					expect(error.message).toEqual('Data parsing error in searchUser');
					return EMPTY;
				})
			).subscribe();
			done();
		});
	});
	
	
});
