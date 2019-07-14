import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Account} from './Account';
import {MessageService} from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountsUrl = 'api/getAccounts';  // URL to web api
  private ordersUrl = 'api/submitOrders';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getAccounts(): Observable<Account[]> {

    return this.http.get<Account[]>(this.accountsUrl)
      .pipe(
        tap(_ => this.log('fetched accounts')),
        catchError(this.handleError<Account[]>('getAccounts', []))
      );
  }

  /** POST: add a new hero to the server */
  addOrder (account: Account): Observable<Account> {
    return this.http.post<Account>(this.ordersUrl, account, httpOptions).pipe(
      tap((newAccount: Account) => this.log(`added order w/ id=${newAccount.id}`)),
      catchError(this.handleError<Account>('addOrder'))
    );
  }

  //
  // /** PUT: update the hero on the server */
  // updateAccount (account: Account): Observable<any> {
  //   return this.http.put(this.ordersUrl, account, httpOptions).pipe(
  //     tap(_ => this.log(`updated account id=${account.id}`)),
  //     catchError(this.handleError<any>('updateAccount'))
  //   );
  // }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`AccountService: ${message}`);
  }
}
