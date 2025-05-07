import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BusinessDashboardComponent } from "./business-dashboard.component";
import { QrModule } from "../qr/qr.module";
import { RewardMenuModule } from "../reward-menu/reward-menu.module";
import { RouterModule } from "@angular/router";
import { AdManagerModule } from "../ad-manager-menu/ad-manager-menu.module";
import { CustomerManagerModule } from "./customer-manager/customer-manager.module";
import { RpxPipesModule } from "../../pipes/rpx-pipes.module";
import { UserSetUpModule } from "../user-set-up/user-set-up.module";
import {IonicModule} from "@ionic/angular";

@NgModule({
  declarations: [BusinessDashboardComponent],
  imports: [
    CommonModule,
    RpxPipesModule,
    RewardMenuModule,
    RouterModule,
    QrModule,
    UserSetUpModule,
    AdManagerModule,
    CustomerManagerModule,
    IonicModule
  ],
  exports: [BusinessDashboardComponent],
})
export class BusinessDashboardModule {}
