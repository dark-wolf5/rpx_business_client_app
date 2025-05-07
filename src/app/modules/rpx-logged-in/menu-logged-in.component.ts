import {AfterViewInit, ChangeDetectionStrategy, Component, ViewChild,} from "@angular/core";
import {UserauthService} from "../../services/userauth.service";
import {SettingsComponent} from "../settings/settings.component";
import {logOutCallback} from "../../helpers/logout-callback";
import {BehaviorSubject} from "rxjs";
import {MenuController} from "@ionic/angular";
import {BusinessLoyaltyPointsState} from "../../state/business.lp.state";
import {MatDialog} from "@angular/material/dialog";
import {ShareAppComponentComponent} from "../share-app-component/share-app-component.component";

@Component({
  selector: "app-menu-logged-in",
  templateUrl: "./menu-logged-in.component.html",
  styleUrls: [],
})
export class MenuLoggedInComponent implements AfterViewInit {
  @ViewChild("rpxSettings") rpxSettings: SettingsComponent;

  mapApp$ = new BehaviorSubject<boolean>(false);

  constructor(
    private userAuthService: UserauthService,
    private menuCtrl: MenuController,
    private businessLoyaltyPointsState: BusinessLoyaltyPointsState,
    public dialog: MatDialog,
  ) {}

  ngAfterViewInit() {
    this.mapApp$.next(true);
  }

  ngOnInit(): void {
    this.getBusinessLoyaltyPointBalance();
  }

  home() {
    this.menuCtrl.close("logged-in-menu");
  }

  logOut(): void {
    this.userAuthService.logOut().subscribe((resp) => {
      logOutCallback(resp);
    });
  }

  getBusinessLoyaltyPointBalance() {
    this.businessLoyaltyPointsState
      .getBusinessLoyaltyPointBalance()
      .subscribe();
  }

  shareApp(): void {
    this.dialog.open(ShareAppComponentComponent, {
      height: "100vh",
      width: "100%",
      autoFocus: false,
      enterAnimationDuration: "0ms",
      exitAnimationDuration: "0ms",
    });
  }
}
