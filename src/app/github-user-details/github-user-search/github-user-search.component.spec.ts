import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubUserSearchComponent } from './github-user-search.component';
import { UserReposComponent } from './user-repos/user-repos.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { GithubService } from '../services/github.service';
import { throwError, of } from 'rxjs';
import { Constants } from '../common/constants/constants';
import { IUserDetails } from '../models/IUserDetails';

describe('GithubUserSearchComponent', () => {
  let component: GithubUserSearchComponent;
  let fixture: ComponentFixture<GithubUserSearchComponent>;
  let gitHubService: GithubService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GithubUserSearchComponent,
        UserReposComponent,
        UserProfileComponent
      ],
      imports: [
        FormsModule
      ],
      providers: [
        HttpClient,
        HttpHandler,
        GithubService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubUserSearchComponent);
    component = fixture.componentInstance;
    gitHubService = TestBed.get(GithubService);
    fixture.detectChanges();

    spyOn(console, 'warn');
    spyOn(window, 'alert');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('should call onSubmit and retrieve all the information', () => {
      gitHubService.getUserDetails = jasmine.createSpy().and.returnValue(of({}));
      gitHubService.getUserReposFilterByStargazersCount = jasmine.createSpy().and.returnValue(of([]));
      component.onSubmit();
      expect(component.userDetails).toEqual({} as IUserDetails, 'userDetails object is not matched');
      expect(component.userRepos).toEqual([], 'userRepos object is not matched');
    });
    describe('onSubmit:getUserDetails', () => {
      it('should call onSubmit, getUserDetails and return string error message', () => {
        gitHubService.getUserDetails = jasmine.createSpy().and.returnValue(throwError(Constants.genericToasterErrorMessage));
        component.onSubmit();
        expect(console.warn).toHaveBeenCalledTimes(1);
      });
      it('should call onSubmit, getUserDetails and return 404 not found', () => {
        component.searchString = 'new';
        const notFoundException: HttpErrorResponse = new HttpErrorResponse({
          error: 'test 404 error',
          status: 404,
          statusText: 'Not Found',
          url: 'https://api.github.com/users/new'
        });
        gitHubService.getUserDetails = jasmine.createSpy().and.returnValue(throwError(notFoundException));
        component.onSubmit();
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(window.alert).toHaveBeenCalledWith('No record found for new, please enter valid user name');
      });
    });
    describe('onSubmit:getUserDetails', () => {
      it('should call onSubmit, getUserDetails and return string error message', () => {
        gitHubService.getUserDetails = jasmine.createSpy().and.returnValue(of({}));
        gitHubService.getUserReposFilterByStargazersCount =
          jasmine.createSpy().and.returnValue(throwError(Constants.genericToasterErrorMessage));
        component.onSubmit();
        expect(console.warn).toHaveBeenCalledTimes(1);
      });
    });
  });
});
