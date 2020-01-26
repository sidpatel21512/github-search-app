import { TestBed } from '@angular/core/testing';

import { GithubService } from './github.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Constants } from '../common/constants/constants';

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
      httpClient.get = jasmine.createSpy().and.returnValue(of(''));
      service.getUserDetails('userName').subscribe((userDetails: any) => {
        expect(userDetails).toEqual(userDetails, 'Problem with get api not returning userDetails');
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
      httpClient.get = jasmine.createSpy().and.returnValue(of(''));
      service.getUserRepos('url').subscribe((userRepos: any) => {
        expect(userRepos).toEqual(userRepos, 'Problem with get api not returning userRepos');
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
});
