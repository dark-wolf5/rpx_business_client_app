import { NgxsDataRepository } from "@angular-ru/ngxs/repositories";
import {
  Computed,
  DataAction,
  Payload,
  StateRepository,
} from "@angular-ru/ngxs/decorators";
import { Injectable } from "@angular/core";
import { State } from "@ngxs/store";
import {UserauthService} from "../services/userauth.service";
import {User} from "../models/user";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {AllowedAccountTypes} from "../helpers/enum/account-type.enum";

@StateRepository()
@State({
  name: "user",
  defaults: {},
})
@Injectable()
export class UserAuthState extends NgxsDataRepository<User> {
  constructor() {
    super();
  }

  @DataAction()
  setUser(@Payload("user") user: User) {
    this.ctx.setState(user);
  }
  
  @Computed()
  get userType$(): Observable<AllowedAccountTypes> {
    return this.state$.pipe(map((u) => u.rpx_user.user_type));
  }
}
