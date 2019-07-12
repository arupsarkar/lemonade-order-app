import { Component, OnInit } from '@angular/core';

import {AccountService} from '../account.service';
import {Account} from '../Account';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accounts: Account[];
  selectedAccount: Account;


  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.getAccounts();
  }
  onSelect(account: Account): void {
    this.selectedAccount = account;
  }

  getAccounts(): void {
    this.accountService.getAccounts()
      .subscribe(accounts => this.accounts = accounts);
  }
}
