import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IRepoDetails } from '../../models/IRepoDetails';

@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.css']
})
export class UserReposComponent implements OnInit,OnChanges {
  @Input()
  userRepos: IRepoDetails[];

  constructor() { }

  ngOnChanges() {
  }

  ngOnInit() {
  }

}
