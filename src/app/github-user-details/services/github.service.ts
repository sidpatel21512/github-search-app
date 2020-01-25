// System import
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, mergeMap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

// Application import
import { ExceptionHandler } from '../common/exception-handler';
import { IUserDetails } from '../models/IUserDetails';
import { IRepoDetails } from '../models/IRepoDetails';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  // Get the user details
  getUserDetails(userName: string): Observable<IUserDetails> {
    return this.http.get<IUserDetails>(`https://api.github.com/users/${userName}`)
      .pipe(catchError(ExceptionHandler.handleError));
  }

  // Get repositories of given user name
  getUserRepos(repoUrl: string): Observable<IRepoDetails[]> {
    return this.http.get<IRepoDetails[]>(repoUrl)
      .pipe(catchError(ExceptionHandler.handleError));
  }

  // Get user's top five repos filter by highest stargazers counts 
  getUserReposFilterByStargazersCount(repoUrl: string): Observable<IRepoDetails[]> {
    return this.getUserRepos(repoUrl).pipe(mergeMap((repos: IRepoDetails[]) => {
      repos.sort((h, s) => h.stargazers_count > s.stargazers_count ? -1 : h.stargazers_count < s.stargazers_count ? 1 : 0);
      return of(repos.slice(0,5));
    }));
  }
}
