import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IUserDetails } from 'src/app/github-user-details/models/IUserDetails';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnChanges {
  @Input()
  userDetails: IUserDetails;

  constructor() { }

  ngOnChanges() {
  }

  ngOnInit() {
  }

}
