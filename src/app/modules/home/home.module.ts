import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { RouterModule, Routes } from "@angular/router";
import { HelperModule } from "../../helpers/helper.module";
import { MenuLoggedOutModule } from "../rpx-logged-out/menu-logged-out.module";
import { IonicModule } from "@ionic/angular";
import {MatDialogModule} from "@angular/material/dialog";

const routes: Routes = [{ path: "", component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MenuLoggedOutModule,
    HelperModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  exports: [HomeComponent, MenuLoggedOutModule],
})
export class HomeModule {}
