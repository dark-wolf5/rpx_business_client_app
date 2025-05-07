import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Business } from "../../models/business";
import { LoyaltyPointsService } from "../../services/loyalty-points/loyalty-points.service";
import { UserauthService } from "../../services/userauth.service";
import { Redeemable } from "../../models/redeemable";
import * as rpxGlobals from "../../globals";
import { BehaviorSubject, take } from "rxjs";
import { BusinessLoyaltyPointsState } from "../../state/business.lp.state";
import { Platform, ToastController } from "@ionic/angular";
import {LoyaltyPointBalance} from "../../models/loyalty-point-balance";

const QR_CODE_LOYALTY_POINTS_SCAN_BASE_URL = rpxGlobals.API + "redeemable";

@Component({
  selector: "app-qr",
  templateUrl: "./qr.component.html",
  styleUrls: ["./qr.component.css", "../reward-menu/reward-menu.component.css"],
})
export class QrComponent implements OnInit {
  @Output() closeThisEvt = new EventEmitter();
  @Output() openUserLPBalanceEvt = new EventEmitter();
  @Output() closeQrUserEvt = new EventEmitter();
  @Output() notEnoughLpEvt = new EventEmitter();

  business = new Business();
  redeemable = new Redeemable();
  userHash$ = new BehaviorSubject<string>(null);
  isBusiness$ = new BehaviorSubject<boolean>(false);
  businessLoyaltyPointsForm: UntypedFormGroup;
  businessLoyaltyPointsFormUp$ = new BehaviorSubject<boolean>(false);
  rewardPrompted$ = new BehaviorSubject<boolean>(false);
  rewardPrompt$ = new BehaviorSubject<boolean>(false);
  loyaltyPointReward$ = new BehaviorSubject<number>(null);
  loyaltyPointRewardDollarValue$ = new BehaviorSubject<number>(null);
  qrCodeLoyaltyPointsBaseUrl$ = new BehaviorSubject<string>(
    QR_CODE_LOYALTY_POINTS_SCAN_BASE_URL,
  );
  loyaltyPointBalance$ = new BehaviorSubject<LoyaltyPointBalance>(null);
  businessLoyaltyPointsSubmitted$ = new BehaviorSubject<boolean>(false);
  qrWidth: number = 320;
  totalSpentModified: number = 0;
  promptForRewardTimeout$ = new BehaviorSubject<any>(null);
  percentBoxForm: UntypedFormGroup;
  percentFormUp$ = new BehaviorSubject<boolean>(false);
  percentFormSubmitted$ = new BehaviorSubject<boolean>(false);

  constructor(
    private userAuthService: UserauthService,
    private loyaltyPointsService: LoyaltyPointsService,
    private formBuilder: UntypedFormBuilder,
    private platform: Platform,
    private businessLoyaltyPointsState: BusinessLoyaltyPointsState,
    private toastService: ToastController,
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.rewardPrompt$.next(false);
      this.rewardPrompted$.next(false);
    });
  }

  async ngOnInit() {
    this.loyaltyPointBalance$.next(this.businessLoyaltyPointsState.getState());
    this.isBusiness$.next(true);
    this.getQrCode();
  }

  async startAwardProcess() {
    this.businessLoyaltyPointsState
      .getBusinessLoyaltyPointBalance()
      .subscribe(() => {
        this.loyaltyPointBalance$.next(
          this.businessLoyaltyPointsState.getState(),
        );
        this.businessLoyaltyPointsSubmitted$.next(true);

        if (this.businessLoyaltyPointsForm.invalid) {
          return;
        }

        this.createRedeemable();
      });
  }

  createRedeemable() {
    const percentValue: number = parseFloat(
      this.loyaltyPointBalance$
        .getValue()
        .loyalty_point_dollar_percent_value.toString(),
    );

    this.loyaltyPointRewardDollarValue$.next(
      this.totalSpent * (percentValue / 100),
    );
    this.loyaltyPointReward$.next(
      (this.loyaltyPointRewardDollarValue$.getValue() * 100) / percentValue,
    );

    this.rewardPrompt$.next(true);
  }

  yes() {
    const redeemableObj = {
      amount: this.loyaltyPointReward$.getValue(),
      total_spent: this.totalSpentModified,
      dollar_value: this.loyaltyPointRewardDollarValue$.getValue(),
    };

    this.loyaltyPointsService
      .createRedeemable(redeemableObj)
      .subscribe((resp) => {
        this.createRedeemableCb(resp);
      });
  }

  createRedeemableCb(resp: any) {
    if (resp.success) {
      this.redeemable.uuid = `${this.qrCodeLoyaltyPointsBaseUrl$.getValue()}?&r=${resp.redeemable.uuid}&t=lp`;
      this.promptForRewardTimeout$.next(null);

      this.rewardPrompt$.next(false);
      this.rewardPrompted$.next(true);
    } else {
      alert(resp.message);
    }
  }

  no() {
    this.rewardPrompt$.next(false);
    this.rewardPrompted$.next(false);
  }

  get totalSpent() {
    return this.businessLoyaltyPointsForm.get("totalSpent").value;
  }
  get f() {
    return this.businessLoyaltyPointsForm.controls;
  }

  getQrCode() {
    this.loyaltyPointsService.getLoyaltyPointBalance();

    this.userAuthService.getSettings().subscribe((resp) => {
      this.userHash$.next(resp.user.uuid);
      this.business.address = resp.business.address;
      this.business.name = resp.business.name;
      this.business.qr_code_link = resp.business.qr_code_link;
      this.business.trial_ends_at = resp.business.trial_ends_at;
    });

    const totalSpentValidators = [Validators.required];

    this.businessLoyaltyPointsForm = this.formBuilder.group({
      totalSpent: ["", totalSpentValidators],
    });

    this.businessLoyaltyPointsFormUp$.next(true);
  }

  get percent() {
    return this.percentBoxForm.get("percent").value;
  }
  get g() {
    return this.percentBoxForm.controls;
  }

  closeQr() {
    this.rewardPrompted$.next(false);
  }

  startPercentSetting() {
    if (this.percentFormUp$.getValue() === true) {
      this.percentFormUp$.next(false);
      return;
    }

    const percentValidators = [Validators.required];

    this.percentBoxForm = this.formBuilder.group({
      percent: ["", percentValidators],
    });

    this.percentFormUp$.next(true);

    this.percentBoxForm
      .get("percent")
      .setValue(this.loyaltyPointBalance$.getValue().loyalty_point_dollar_percent_value);
  }

  savePercent() {
    if (this.percentBoxForm.invalid) {
      return;
    }

    this.loyaltyPointsService.savePercentage(this.percent).subscribe((resp) => {
      this.savePercentCb(resp);
    });
  }

  async savePercentCb(resp: any) {
    this.userAuthService.getSettings().pipe(take(1)).subscribe();

    const toast = await this.toastService.create({
      message: resp.error?.message ?? resp.message,
      duration: 1500,
      position: "bottom",
    });
    await toast.present();

    setTimeout(() => {
      this.percentFormUp$.next(false);
    }, 2000);
  }
}
