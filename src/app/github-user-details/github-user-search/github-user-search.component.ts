import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { GithubService } from '../services/github.service';
import { IUserDetails } from '../models/IUserDetails';
import { IRepoDetails } from '../models/IRepoDetails';
import { CacheService } from '../services/cache.service';
import { ICachedUserData } from '../models/ICachedUserData';

@Component({
  selector: 'app-github-user-search',
  templateUrl: './github-user-search.component.html',
  styleUrls: ['./github-user-search.component.css']
})
export class GithubUserSearchComponent implements OnInit {

  public searchString: string;
  public userDetails: IUserDetails;
  public userRepos: IRepoDetails[];
  public cachedSearchStrings: Array<ICachedUserData>;
  constructor(private githubService: GithubService, private cacheService: CacheService) {
    this.searchString = '';
    this.cachedSearchStrings = this.cacheService.getCachedSearchStringData();
  }

  ngOnInit() {
  }

  // This method call on click of submit button and retrive the user details and it's repos details.
  onSubmit(): void {
    this.githubService.getUserDetails(this.searchString)
      .subscribe((response: IUserDetails) => {
        this.userDetails = response;
        this.githubService.getUserReposFilterByStargazersCount(response.repos_url)
          .subscribe((repos: IRepoDetails[]) => {
            this.userRepos = repos;
            this.cacheService.AddSearchStringDataIntoCache(this.searchString, this.userDetails, this.userRepos);
          }, (error: any) => {
            console.warn('error:', error);
            alert(error);
          });
      }, (error: any) => {
        console.warn('error:', error);
        if (error.status === 404) {
          alert(`No record found for ${this.searchString}, please enter valid user name`);
        } else {
          alert(error);
        }
      });
  }

  // Loads cached data for search string
  loadCacheData(cacheData: ICachedUserData): void {
    this.userDetails = cacheData.userDetails;
    this.userRepos = cacheData.userRepos;
  }
}
