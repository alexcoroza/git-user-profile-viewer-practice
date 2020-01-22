import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { getUsersMockData }  from '../mock-data/get-users';
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


	describe('getUsers', () => {
		let httpGetSpy;

		beforeEach(() => {
			httpGetSpy = spyOn(TestBed.get(HttpClient), 'get').and.returnValue(of(getUsersMockData));
		});

		it('should return User[] if theres no error', (done) => {
			service.getUsers()
			.subscribe((users) => {
				expect(users).toBeDefined();
				done();
			});
		});
	});
	
	
});
