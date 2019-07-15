import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Account} from '../Account';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {
  @Input() account: Account;
  @Output() refreshAccounts: EventEmitter<string> = new EventEmitter<string>();
  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

  save(): void {
    this.accountService.addOrder(this.account)
      .subscribe(() => console.log('Account Updated'));
    this.refreshAccounts.emit('RefreshAccount');
  }

}
