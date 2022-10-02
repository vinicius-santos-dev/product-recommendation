import {Injectable} from '@angular/core';
import {Store, StoreConfig} from '@datorama/akita';
import {Product, ProductParams, User} from "../../models";


export interface UserState {
  user: User | null;
}

function createInitialState(): UserState {
  return {
    user: null
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'user'})
export class UserStore extends Store<UserState> {
  constructor() {
    super(createInitialState());
  }
}
