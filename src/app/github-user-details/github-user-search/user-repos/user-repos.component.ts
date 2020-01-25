import { Component, OnInit, Input } from '@angular/core';
import { IRepoDetails } from '../../models/IRepoDetails';

@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.css']
})
export class UserReposComponent implements OnInit {
  @Input()
  userRepos: IRepoDetails[];

  constructor() { }

  ngOnChanges() {
    console.log('r:', this.userRepos);
  }
  ngOnInit() {
  }

}
