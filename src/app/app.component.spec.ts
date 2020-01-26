import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GithubUserSearchComponent } from './github-user-details/github-user-search/github-user-search.component';
import { FormsModule } from '@angular/forms';
import { UserReposComponent } from './github-user-details/github-user-search/user-repos/user-repos.component';
import { UserProfileComponent } from './github-user-details/github-user-search/user-profile/user-profile.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        GithubUserSearchComponent,
        UserReposComponent,
        UserProfileComponent
      ],
      imports: [
        FormsModule
      ],
      providers: [
        HttpClient,
        HttpHandler
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'github-search-app'`, () => {
    expect(component.title).toEqual('github-search-app');
  });
});
