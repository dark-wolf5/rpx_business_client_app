import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {BehaviorSubject, map, Observable, of} from "rxjs";
import {catchError, filter, tap} from "rxjs/operators";
import { handleError } from "../helpers/error-helper";
import { User } from "../models/user";

import * as rpxGlobals from "../globals";
import { AllowedAccountTypes } from "../helpers/enum/account-type.enum";
import {Business} from "../models/business";
import {UserAuthState} from "../state/user.auth.state";
import {SettingsResponse} from "../interfaces/settings";

const USER_API = rpxGlobals.API + "user";
const BUSINESS_API = rpxGlobals.API + "business";

@Injectable({
  providedIn: "root",
})
export class UserauthService {

  user$: Observable<User> = this.userAuthState.state$;
  business$: Observable<Business>;

  constructor(
    private http: HttpClient,
    private userAuthState: UserAuthState
  ) {
    this.business$ = this.user$.pipe(
        filter(u => !!u),
        map(u => u.business)
      );
  }

  async checkIfLoggedIn(): Promise<any> {
    const loginApi = `${USER_API}/check-user-auth`;

    return new Promise((resolve, reject) => {
      this.http.post<any>(loginApi, null).subscribe((resp) => {
        if (resp.message === "1") {
          resolve(resp);
        } else {
          reject();
        }
      });
    });
  }

  saveBusiness(businessInfo: any): Observable<any> {
    let apiUrl = `${BUSINESS_API}/save-business`;

    const businessInfoObj = {
      name: businessInfo.name,
      description: businessInfo.description,
      address: businessInfo.address,
      photo: businessInfo.photo,
      loc_x: businessInfo.loc_x,
      loc_y: businessInfo.loc_y,
      categories: businessInfo.categories,
      city: businessInfo.city,
      country: businessInfo.country,
      line1: businessInfo.line1,
      line2: businessInfo.line2,
      postal_code: businessInfo.postal_code,
      state: businessInfo.state,
      accountType: businessInfo.accountType,
      is_food_truck: businessInfo.is_food_truck,
    };

    return this.http
      .post<any>(apiUrl, businessInfoObj)
      .pipe(catchError(handleError("saveBusiness")));
  }

  logOut(): Observable<any> {
    const logOutApi = `${USER_API}/logout`;
    return this.http.post<any>(logOutApi, null);
  }

  initLogin(
    userLogin: string,
    userPassword: string,
  ): Observable<any> {
    const params = {
      login: userLogin,
      password: userPassword,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      route: "/business",
    };

    const logInApi = `${USER_API}/login`;

    return this.http.post<any>(logInApi, params).pipe(
      catchError((err) => {
        throw err;
      }),
    );
  }

  getSettings(): Observable<SettingsResponse> {
    const getSettingsApi = `${USER_API}/settings`;

    return this.http.post<SettingsResponse>(getSettingsApi, null).pipe(
      tap(settings => this.userAuthState.setUser({
        ...settings.user,
        rpx_user: settings.rpx_user,
        business: settings.business,
        loyalty_point_balance: settings.loyalty_point_balance,
      })),
      catchError(err => {throw err}),
    );
  }

  saveSettings(user: User): Observable<SettingsResponse> {
    const saveSettingsApi = `${USER_API}/update`;

    let saveSettingsObj;

    if (!user.business) {
      saveSettingsObj = {
        username: user.username,
        email: user.email,
        first_name: user.rpx_user.first_name,
        last_name: user.rpx_user.last_name,
        phone_number: user.rpx_user.phone_number,
        privacy: user.rpx_user.privacy,
        account_type: user.rpx_user.user_type,
      };
    } else {
      saveSettingsObj = {
        username: user.username,
        email: user.email,
        first_name: user.rpx_user.first_name,
        last_name: user.rpx_user.last_name,
        phone_number: user.rpx_user.phone_number,
        privacy: user.rpx_user.privacy,
        account_type: user.rpx_user.user_type,
        origin_description: user.business.description,
        origin_address: user.business.address,
        origin_title: user.business.name,
        origin_x: user.business.loc_x,
        origin_y: user.business.loc_y,
      };
    }

    return this.http.put<SettingsResponse>(saveSettingsApi, saveSettingsObj).pipe(
      catchError((err) => { throw err; }),
      tap((settings) => this.userAuthState.setUser({
        ...settings.user,
        rpx_user: settings.rpx_user,
        business: settings.business,
        loyalty_point_balance: settings.loyalty_point_balance,
      })),
    );
  }

  setPassResetPin(emailOrPhone: string): Observable<any> {
    const resetPasswordApi = `${USER_API}/send-pass-email`;
    const setPassResetObj = {
      email: emailOrPhone,
    };

    return this.http.post<any>(resetPasswordApi, setPassResetObj).pipe(
      catchError((err) => {
        throw err;
      }),
    );
  }

  creatAccount(account: {
    email: string;
    phone_number: string;
    firstName: string;
  }): Observable<any> {
    return this.http.post(`${USER_API}/create-user`, account);
  }

  completeReset(
    password: string,
    passwordConfirmation: string,
    email: string,
    token: string,
  ): Observable<any> {
    const resetPasswordApi = `${USER_API}/complete-pass-reset`;
    const passResetObj = {
      password,
      password_confirmation: passwordConfirmation,
      email,
      token,
    };

    return this.http
      .put<any>(resetPasswordApi, passResetObj)
      .pipe(catchError(handleError("completeReset")));
  }

  passwordChange(passwordChangeObj: any): Observable<any> {
    const resetPasswordApi = `${USER_API}/change-password`;

    const passResetObj = {
      password: passwordChangeObj.password,
      password_confirmation: passwordChangeObj.passwordConfirmation,
      current_password: passwordChangeObj.currentPassword,
    };

    return this.http
      .put<any>(resetPasswordApi, passResetObj)
      .pipe(catchError(handleError("passwordChange")));
  }

  saveLocation(businessInfo: any): Observable<any> {
    const apiUrl = `${BUSINESS_API}/save-location`;

    const businessInfoObj = {
      address: businessInfo.address,
      photo: businessInfo.photo,
      loc_x: businessInfo.loc_x,
      loc_y: businessInfo.loc_y,
      city: businessInfo.city,
      country: businessInfo.country,
      line1: businessInfo.line1,
      line2: businessInfo.line2,
      postal_code: businessInfo.postal_code,
      state: businessInfo.state,
    };

    return this.http
      .put<any>(apiUrl, businessInfoObj)
      .pipe(catchError(handleError("saveLocation")));
  }
}
