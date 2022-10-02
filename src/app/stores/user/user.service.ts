import {Injectable} from '@angular/core';
import {UserState, UserStore} from "./user.store";
import {Product, User} from "../../models";
import {UserQuery} from "./user.query";
import {Observable, tap} from "rxjs";
import {UserService} from "../../services/user/user.service";

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  constructor(private userStore: UserStore, private userQuery: UserQuery, private userService: UserService) {
  }

  public getUserByDocumentNumber(documentNumber: string): Observable<User> {
    return this.userService.getUserByDocumentNumber(documentNumber).pipe(
      tap(user => this.userStore.update({user}))
    );
  }

}
