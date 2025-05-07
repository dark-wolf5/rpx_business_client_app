import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from "@angular/forms";
import { UserauthService } from "../../../services/userauth.service";
import { Router } from "@angular/router";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { BehaviorSubject } from "rxjs";
import { LoadingController } from "@ionic/angular";
import {catchError, filter} from "rxjs/operators";
import { Preferences } from "@capacitor/preferences";

@Component({
  selector: " app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.css"],
})
export class LogInComponent implements OnInit {
  @ViewChild("rpxSignUpIssues") rpxSignUpIssues: ElementRef;

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  loading$ = new BehaviorSubject<boolean>(undefined);
  loader: HTMLIonLoadingElement;
  current_login_username: string;
  logInForm: UntypedFormGroup;
  submitted$ = new BehaviorSubject<boolean>(false);
  rememberMeToken: string;
  passwordShow$ = new BehaviorSubject<boolean>(false);
  business: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private userAuthService: UserauthService,
    private router: Router,
    private loadingCtrl: LoadingController,
  ) {
    this.initLoading();
  }

  ngOnInit() {
    this.initLogInForm();
    this.checkTokenLogin();
  }

  async checkTokenLogin() {
    const retLastUsername = await Preferences.get({
      key: "rpx_lastLoggedUserName",
    });
    this.current_login_username = retLastUsername.value;

    const retRememberMe = await Preferences.get({ key: "rpx_rememberMe" });
    const rememberMe = retRememberMe.value;

    const retIsLoggedIn = await Preferences.get({ key: "rpx_loggedIn" });
    const isLoggedIn = retIsLoggedIn.value;

    if (rememberMe === "1" && isLoggedIn !== "1") {
      this.initTokenLogin();
    }
  }

  /**
   * Shows and hide the password text.
   */
  togglePassword() {
    this.passwordShow$.next(!this.passwordShow$.getValue());
  }

  getEyeIcon() {
    let ionIcon = faEye;
    if (this.passwordShow$.getValue() === false) {
      ionIcon = faEyeSlash;
    }

    return ionIcon;
  }

  /**
   * Will log the user in.
   * @param userLogin
   * @param userPass
   */
  loginUser(userLogin: string, userPass: string) {
    this.userAuthService
      .initLogin(userLogin, userPass)
      .pipe(catchError(err => {
        this.rpxSignUpIssues.nativeElement.innerHTML =
          "<span class='rpx-text-gradient rpx-error'>INVALID USERNAME OR PASSWORD.</span>";
        this.rpxSignUpIssues.nativeElement.style.display = "block";
        this.logInForm.get("rpxPassword").setErrors({ required: false });
        this.logInForm.get("rpxUsername").setErrors({ required: false });
        return err;
      }))
      .subscribe(resp => this.loginCallback(resp));
  }

  private loginCallback(loginResponse: any): void {
    if (loginResponse.error === "popup_closed_by_user") {
      this.loading$.next(false);
      return;
    }

    if (!loginResponse) {
      this.logInForm.setErrors(null);
      this.logInForm.get("rpxUsername").setErrors({ invalidUorP: true });
      this.loading$.next(false);
    }

    const loginStatus = loginResponse.message;

    if (loginStatus === "success" || loginStatus === "confirm") {
      Preferences.set({
        key: "rpx_userLogin",
        value: loginResponse.user.username,
      });
      Preferences.set({ key: "rpx_loggedIn", value: "1" });
      Preferences.set({
        key: "rpx_rememberMe",
        value: "1",
      });
      Preferences.set({
        key: "rpx_userType",
        value: loginResponse.rpx_user.user_type,
      });
      Preferences.set({
        key: "rpxcom_session",
        value: loginResponse.token_info.original.access_token,
      });

      this.rememberMeToken = loginResponse.remember_me_token;
      Preferences.set({
        key: "rpx_rememberMeToken",
        value: this.rememberMeToken,
      });

      this.loading$.next(false);
      this.router.navigate(["/user-home"]);
    } else {
      this.rpxSignUpIssues.nativeElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      if (
        loginStatus === "invalid_cred" ||
        loginStatus === "rpx_account" ||
        loginStatus === "wrong_account_type"
      ) {
        if (loginStatus === "invalid_cred") {
          this.rpxSignUpIssues.nativeElement.innerHTML =
            "<span class='rpx-text-gradient rpx-error'>INVALID USERNAME OR PASSWORD.</span>";
          this.rpxSignUpIssues.nativeElement.style.display = "block";
        } else if (loginStatus === "rpx_account") {
          this.logInForm
            .get("rpxUsername")
            .setErrors({ rpx_account: true });
        } else if (loginStatus === "wrong_account_type") {
          this.rpxSignUpIssues.nativeElement.innerHTML =
            "<span class='rpx-text-gradient rpx-error'>LOG-IN WITH THE CLIENT APP.</span>";
          this.logInForm
            .get("rpxUsername")
            .setErrors({ wrong_account_type: true });
        }
      }
    }
    this.loading$.next(false);
  }

  /**
   * Initiate the user login.
   */
  initLogIn(): void {
    this.loading$.next(true);
    this.submitted$.next(true);

    this.loginUser(this.email, this.password);
  }

  /**
   * Initiate the login form.
   * @private
   */
  private async initLogInForm() {
    const usernameValidators = [Validators.required];
    const passwordValidators = [Validators.required];

    this.logInForm = this.formBuilder.group({
      rpxUsername: ['', usernameValidators],
      rpxPassword: ['', passwordValidators],
    });

    this.loading$.next(false);
  }

  /**
   * Log the user in with the stored token.
   */
  async initTokenLogin() {
    const retSavedUsername = await Preferences.get({
      key: "rpx_userLogin",
    });
    const savedUsername = retSavedUsername.value;

    // The userPass is set to a random key because the user doesn't need a password to log-in with a token.
    this.loginUser(savedUsername, "randomkey");
  }

  get email() {
    return this.logInForm.get("rpxUsername").value;
  }
  get password() {
    return this.logInForm.get("rpxPassword").value;
  }
  get f() {
    return this.logInForm.controls;
  }

  /**
   * subscribe to the loading behavior subject to toggle the loading screen on/off.
   */
  initLoading() {
    this.loading$
      .pipe(filter((loading) => loading !== undefined))
      .subscribe(async (loading) => {
        if (loading) {
          this.loader = await this.loadingCtrl.create({
            message: "LOADING...",
          });
          this.loader.present();
        } else {
          if (this.loader) {
            this.loader.dismiss();
            this.loader = null;
          }
        }
      });
  }
}
