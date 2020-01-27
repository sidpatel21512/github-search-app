import { TestBed } from '@angular/core/testing';

import { GithubService } from './github.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Constants } from '../common/constants/constants';
import { IRepoDetails } from '../models/IRepoDetails';

describe('GithubService', () => {
  let service: GithubService;
  let httpClient: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler
      ]
    });
    service = TestBed.get(GithubService);
    httpClient = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUserDetails', () => {
    it('should called get api and return user profile information', () => {
      httpClient.get = jasmine.createSpy().and.returnValue(of({}));
      service.getUserDetails('userName').subscribe((userDetails: any) => {
        expect(userDetails).toEqual({}, 'Problem with get api not returning userDetails');
      }, () => {
        fail('subscribe promise failed');
      });
      expect(httpClient.get).toHaveBeenCalledTimes(1);
    });

    it('should called get api and throw unhandled exception', () => {
      httpClient.get = jasmine.createSpy().and.returnValue(throwError(''));
      service.getUserDetails('userDetails').subscribe(() => {
        fail('subscribe promise passed');
      }, ((error: string) => {
        expect(error).toEqual(Constants.genericToasterErrorMessage, 'Problem with error message');
      }));
      expect(httpClient.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUserRepos', () => {
    it('should called get api and return user repos information', () => {
      httpClient.get = jasmine.createSpy().and.returnValue(of({}));
      service.getUserRepos('url').subscribe((userRepos: any) => {
        expect(userRepos).toEqual({}, 'Problem with get api not returning userRepos');
      }, () => {
        fail('subscribe promise failed');
      });
      expect(httpClient.get).toHaveBeenCalledTimes(1);
    });

    it('should called get api and throw unhandled exception', () => {
      httpClient.get = jasmine.createSpy().and.returnValue(throwError(''));
      service.getUserRepos('url').subscribe(() => {
        fail('subscribe promise passed');
      }, ((error: string) => {
        expect(error).toEqual(Constants.genericToasterErrorMessage, 'Problem with error message');
      }));
      expect(httpClient.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUserReposFilterByStargazersCount', () => {
    it('should called the function and return highest top 5 user repos by stargazers counts', () => {
      const userRepos = [{
        name: 'repo1',
        stargazers_count: 6
      },
      {
        name: 'repo2',
        stargazers_count: 16
      },
      {
        name: 'repo3',
        stargazers_count: 2
      },
      {
        name: 'repo4',
        stargazers_count: 9
      },
      {
        name: 'repo5',
        stargazers_count: 2
      },
      {
        name: 'repo6',
        stargazers_count: 1
      },
      {
        name: 'repo7',
        stargazers_count: 0
      },
      {
        name: 'repo8',
        stargazers_count: 10
      },
      {
        name: 'repo9',
        stargazers_count: 10
      },
      {
        name: 'repo10',
        stargazers_count: 10
      },
      {
        name: 'repo11',
        stargazers_count: 9
      },
      {
        name: 'repo12',
        stargazers_count: 9
      }
      ] as IRepoDetails[];

      const expectedUserRepos = [
        {
          name: 'repo2',
          stargazers_count: 16
        },
        {
          name: 'repo8',
          stargazers_count: 10
        },
        {
          name: 'repo9',
          stargazers_count: 10
        },
        {
          name: 'repo10',
          stargazers_count: 10
        },
        {
          name: 'repo4',
          stargazers_count: 9
        }
      ] as IRepoDetails[];
      service.getUserRepos = jasmine.createSpy().and.returnValue(of(userRepos));
      service.getUserReposFilterByStargazersCount('url').subscribe((filteredUserRepos: any) => {
        expect(filteredUserRepos).toEqual(expectedUserRepos, 'Problem with get api not returning userRepos');
      }, () => {
        fail('subscribe promise failed');
      });
      expect(service.getUserRepos).toHaveBeenCalledTimes(1);
    });

    it('should called the function and throw unhandled exception', () => {
      service.getUserRepos = jasmine.createSpy().and.returnValue(throwError(Constants.genericToasterErrorMessage));
      service.getUserReposFilterByStargazersCount('url').subscribe(() => {
        fail('subscribe promise passed');
      }, ((error: string) => {
        expect(error).toEqual(Constants.genericToasterErrorMessage, 'Problem with error message');
      }));
      expect(service.getUserRepos).toHaveBeenCalledTimes(1);
    });
  });
});
