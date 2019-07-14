import {Component, Input, OnInit} from '@angular/core';
import {Account} from '../Account';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {
  @Input() account: Account;
  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

  save(): void {
    this.accountService.addOrder(this.account)
      .subscribe(() => console.log('Account Updated'));
  }

}
