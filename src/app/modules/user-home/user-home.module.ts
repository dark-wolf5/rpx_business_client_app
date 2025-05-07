import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserHomeComponent } from "./user-home.component";
import { MenuLoggedInModule } from "../rpx-logged-in/menu-logged-in.module";
import { RouterModule, Routes } from "@angular/router";
import { HelperModule } from "../../helpers/helper.module";
import {BusinessDashboardModule} from "../business-dashboard/business-dashboard.module";
import {IonicModule} from "@ionic/angular";
import {SettingsModule} from "../settings/settings.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatDialogModule} from "@angular/material/dialog";

const routes: Routes = [
  { path: '', component: UserHomeComponent },
  { path: 'settings',
    loadChildren: () =>
      import("../settings/settings.module").then((m) => m.SettingsModule),
  },
];

@NgModule({
  declarations: [UserHomeComponent],
  imports: [
    CommonModule,
    HelperModule,
    MenuLoggedInModule,
    MatDialogModule,
    RouterModule.forChild(routes),
    BusinessDashboardModule,
    IonicModule,
    SettingsModule,
    FontAwesomeModule,
  ],
  exports: [UserHomeComponent],
})
export class UserHomeModule {}
