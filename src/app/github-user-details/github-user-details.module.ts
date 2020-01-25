import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubUserSearchComponent } from './github-user-search/github-user-search.component';
import { UserProfileComponent } from './github-user-search/user-profile/user-profile.component';
import { UserReposComponent } from './github-user-search/user-repos/user-repos.component';



@NgModule({
  declarations: [GithubUserSearchComponent, UserProfileComponent, UserReposComponent],
  imports: [
    CommonModule
  ]
})
export class GithubUserDetailsModule { }
