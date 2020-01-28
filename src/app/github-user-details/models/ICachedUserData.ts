import { IUserDetails } from './IUserDetails';
import { IRepoDetails } from './IRepoDetails';

export interface ICachedUserData {
  searchString: string;
  userDetails: IUserDetails;
  userRepos: IRepoDetails[];
}
