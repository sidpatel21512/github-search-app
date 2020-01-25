// System imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// 3rd party import
import { AngularFontAwesomeModule } from 'angular-font-awesome';

// Application imports
import { AppComponent } from './app.component';
import { GithubUserSearchComponent } from './github-user-details/github-user-search/github-user-search.component';
import { UserProfileComponent } from './github-user-details/github-user-search/user-profile/user-profile.component';
import { UserReposComponent } from './github-user-details/github-user-search/user-repos/user-repos.component';

@NgModule({
  declarations: [
    AppComponent,
    GithubUserSearchComponent,
    UserProfileComponent,
    UserReposComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
