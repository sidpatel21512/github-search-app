import { Injectable } from '@angular/core';
import { ICachedUserData } from '../models/ICachedUserData';
import { IRepoDetails } from '../models/IRepoDetails';
import { IUserDetails } from '../models/IUserDetails';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  public cachedSearchStringData: Array<ICachedUserData>;
  constructor() {
    this.cachedSearchStringData = [];
   }

  getCachedSearchStringData(): ICachedUserData[] {
    return this.cachedSearchStringData;
  }

  AddSearchStringDataIntoCache(searchString: string, userDetails: IUserDetails, userRepos: IRepoDetails[]): void {
    const isSearchStringExistInCache = this.SearchStringExistInCache(searchString);
    if (!isSearchStringExistInCache) {
      this.cachedSearchStringData.push({
        searchString,
        userDetails,
        userRepos
      });
    }
  }

  SearchStringExistInCache(searchString: string): boolean {
    const index = this.cachedSearchStringData.findIndex((e: ICachedUserData) => {
      return e.searchString === searchString;
    });

    return index >= 0 ? true : false;
  }
}
