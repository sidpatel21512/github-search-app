import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubUserSearchComponent } from './github-user-search.component';
import { UserReposComponent } from './user-repos/user-repos.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('GithubUserSearchComponent', () => {
  let component: GithubUserSearchComponent;
  let fixture: ComponentFixture<GithubUserSearchComponent>;

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
        HttpHandler
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubUserSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
