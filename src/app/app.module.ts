import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserProfilesPageComponent } from './components/pages/user-profiles-page/user-profiles-page.component';
import { UserCardComponent } from './components/shared/user-card/user-card.component';

@NgModule({
	declarations: [
		AppComponent,
		UserProfilesPageComponent,
		UserCardComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ReactiveFormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
