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
    console.log('---> Fetching accounts : Start');
    this.getAccounts();
    console.log('---> Fetching accounts : End');
  }
  onSelect(account: Account): void {
    console.log('---> selectedAccount : Start');
    this.selectedAccount = account;
    console.log('---> selectedAccount : End');
  }

  getAccounts(): void {
    this.accountService.getAccounts()
      .subscribe(accounts => this.accounts = accounts);
  }

  async refreshAccounts(val: string) {
    console.log('---> refreshAccounts : Start');
    console.log(val);
    await this.delay(5000);
    this.getAccounts();
    console.log('---> refreshAccounts : End');
  }

  private delay(ms: number) {
    console.log('---> delay : Start');
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
