import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfilesPageComponent } from './components/pages/user-profiles-page/user-profiles-page.component';


const routes: Routes = [
	{ path: '', redirectTo: '/user-profiles', pathMatch: 'full' },
	{ path: 'user-profiles', component: UserProfilesPageComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
