import { TestBed } from '@angular/core/testing';

import { CacheService } from './cache.service';
import { IUserDetails } from '../models/IUserDetails';
import { IRepoDetails } from '../models/IRepoDetails';
import { ICachedUserData } from '../models/ICachedUserData';

describe('CacheService', () => {
  let service: CacheService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(CacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.cachedSearchStringData).toEqual([]);
  });

  describe('AddSearchStringDataIntoCache', () => {
    it('should be call method and push data into cache', () => {
      const userData = {
        searchString: 'blah',
        userDetails: {
          name: 'name',
          avatar_url: 'avatar_url'
        } as IUserDetails,
        userRepos: [{
          description: 'description1',
          stargazers_count: 1
        }, {
          description: 'description2',
          stargazers_count: 2
        }] as IRepoDetails[]
      } as ICachedUserData;
      service.AddSearchStringDataIntoCache(userData.searchString, userData.userDetails, userData.userRepos);
      expect(service.cachedSearchStringData).toEqual([userData]);
    });
    it('should be call method and do not push duplicate data into cache', () => {
      const userData = {
        searchString: 'blah',
        userDetails: {
          name: 'name',
          avatar_url: 'avatar_url'
        } as IUserDetails,
        userRepos: [{
          description: 'description1',
          stargazers_count: 1
        }, {
          description: 'description2',
          stargazers_count: 2
        }] as IRepoDetails[]
      } as ICachedUserData;
      service.cachedSearchStringData = [userData];
      service.AddSearchStringDataIntoCache(userData.searchString, userData.userDetails, userData.userRepos);
      expect(service.cachedSearchStringData).toEqual([userData]);
    });
  });
});
