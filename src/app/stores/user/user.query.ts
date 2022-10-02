import {Query} from '@datorama/akita';
import {UserState, UserStore} from "./user.store";
import {Observable} from "rxjs";
import {User} from "../../models";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class UserQuery extends Query<UserState> {
  public user$: Observable<User>;

  public get user(): User {
    return this.getValue().user;
  }

  constructor(protected override store: UserStore) {
    super(store);

    this.user$ = this.select('user');
  }
}
