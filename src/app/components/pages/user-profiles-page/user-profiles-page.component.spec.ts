import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { throwError, of } from 'rxjs';

import { UserProfilesPageComponent } from './user-profiles-page.component';
import { UserService } from 'src/app/services/user.service';

describe('UserProfilesPageComponent', () => {
	let component: UserProfilesPageComponent;
	let fixture: ComponentFixture<UserProfilesPageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientModule,
				ReactiveFormsModule
			],
			declarations: [UserProfilesPageComponent],
			providers: [
				HttpClient,
				UserService
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserProfilesPageComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});


	describe('searchUsers', () => {
		let userServiceSpy;

		beforeEach(() => {
			userServiceSpy = spyOn(TestBed.get(UserService), 'searchUsers').and.returnValue(of([null, null, null]));
		});
		
		it('should catch any error and show an alert notif to user', () => {
			let alertSpy = spyOn(window, 'alert')
			userServiceSpy.and.returnValue(throwError('not found error'));
			component.searchUsers();
			expect(alertSpy).toHaveBeenCalledWith('There is something wrong during lookup.');
		});

		it('should set the search result to component.users', () => {
			component.searchUsers();
			expect(component.users).toEqual([null, null, null]);
		});
	});
	
	
});
