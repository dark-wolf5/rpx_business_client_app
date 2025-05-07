import {ChangeDetectionStrategy, Component, EventEmitter, Output} from "@angular/core";
import {AllowedAccountTypes} from "../../helpers/enum/account-type.enum";
import {faTruck} from "@fortawesome/free-solid-svg-icons";
import {UserauthService} from "../../services/userauth.service";
import {map} from "rxjs/operators";
import {FoodTruckLocationDialogComponent} from "../food-truck-location/food-truck-location-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: "app-user-home",
  templateUrl: "./user-home.component.html",
  styleUrls: ["./user-home.component.css"],
})
export class UserHomeComponent {
  @Output() openSettingsEvt = new EventEmitter();

  user$ = this.userAuthService.user$;
  userType$ = this.userAuthService.user$.pipe(
    map((userProfile) => userProfile.rpx_user.user_type),
  );

  faFoodTruck = faTruck;
  eAllowedAccountTypes = AllowedAccountTypes;

  constructor(
    private userAuthService: UserauthService,
    public dialog: MatDialog,
  ) {}

  updateFoodTruck() {
    this.dialog.open(FoodTruckLocationDialogComponent, {
      height: "100vh",
      width: "100%",
      autoFocus: false,
      enterAnimationDuration: "0ms",
      exitAnimationDuration: "0ms",
    });
  }
}
