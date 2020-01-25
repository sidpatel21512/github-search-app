import { Component, OnInit, Input } from '@angular/core';
import { GithubService } from "../services/github.service";
import { IUserDetails } from '../models/IUserDetails';
import { IRepoDetails } from '../models/IRepoDetails';

@Component({
  selector: 'app-github-user-search',
  templateUrl: './github-user-search.component.html',
  styleUrls: ['./github-user-search.component.css']
})
export class GithubUserSearchComponent implements OnInit {

  public searchString: string;
  public userDetails: IUserDetails;
  public userRepos: IRepoDetails[];
  constructor(private githubService: GithubService) {
    this.searchString = '';
  }

  ngOnInit() {
  }


  // This method call on click of submit button
  onSubmit(): void {
    console.log('string:', this.searchString);
    this.githubService.getUserDetails(this.searchString)
      .subscribe((response: IUserDetails) => {
        this.userDetails = response;
        this.githubService.getUserReposFilterByStargazersCount(response.repos_url)
          .subscribe((repos: IRepoDetails[]) => {
            console.log('repos:', repos);
            this.userRepos = repos;
          }, (error: string) => {
            console.log('error:', error);
          });
      }, (error: string) => {
        console.log('error:', error);
      });
  }

}
