import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MenuLoggedInComponent } from "./menu-logged-in.component";
import { RpxPipesModule } from "../../pipes/rpx-pipes.module";
import { RouterModule } from "@angular/router";
import { HelperModule } from "../../helpers/helper.module";
import { SettingsModule } from "../settings/settings.module";
import { IonicModule } from "@ionic/angular";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { BusinessDashboardModule } from "../business-dashboard/business-dashboard.module";

@NgModule({
  declarations: [MenuLoggedInComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RpxPipesModule,
    RouterModule,
    HelperModule,
    SettingsModule,
    RouterModule,
    IonicModule.forRoot(),
    FontAwesomeModule,
    BusinessDashboardModule,
    //EventMenuModule
  ],
  exports: [MenuLoggedInComponent],
})
export class MenuLoggedInModule {}
