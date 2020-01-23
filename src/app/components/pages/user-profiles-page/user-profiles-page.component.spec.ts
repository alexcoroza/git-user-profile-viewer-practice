import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { throwError, of } from 'rxjs';

import { UserService } from 'src/app/services/user.service';
import { UserProfilesPageComponent } from './user-profiles-page.component';
import { UserCardComponent } from '../../shared/user-card/user-card.component';

describe('UserProfilesPageComponent', () => {
	let component: UserProfilesPageComponent;
	let fixture: ComponentFixture<UserProfilesPageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientModule,
				ReactiveFormsModule
			],
			declarations: [
				UserProfilesPageComponent,
				UserCardComponent
			],
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


	describe('searchUser', () => {
		let userServiceSpy;

		beforeEach(() => {
			userServiceSpy = spyOn(TestBed.get(UserService), 'searchUser').and.returnValue(of(null));
		});
		
		it('should catch any error and show an alert notif to user', () => {
			const alertSpy = spyOn(window, 'alert')
			userServiceSpy.and.returnValue(throwError('not found error'));
			component.searchUser();
			expect(alertSpy).toHaveBeenCalledWith('There is something wrong during lookup.');
		});

		it('should show an alert notif to user if the user is not found', () => {
			const alertSpy = spyOn(window, 'alert')
			userServiceSpy.and.returnValue(throwError({ status: 404 }));
			component.searchUser();
			expect(alertSpy).toHaveBeenCalledWith('Cannot find git user.');
		});

		it('should push the result to component.users', () => {
			component.searchUser();
			component.searchUser();
			expect(component.users).toEqual([null, null]);
		});
	});
	
	
});
