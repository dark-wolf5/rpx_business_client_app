import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { LoginGuardServiceService } from "./services/route-services/login-guard-service.service";

const routes: Routes = [
  {
    path: "home",
    loadChildren: () => import("./modules/home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "forgot-password",
    loadChildren: () =>
      import(
        "./modules/forgot-password/forgot-password.module"
      ).then((m) => m.ForgotPasswordModule),
  },
  {
    path: "user-home",
    loadChildren: () =>
      import("./modules/user-home/user-home.module").then((m) => m.UserHomeModule),
    canActivate: [LoginGuardServiceService],
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./modules/settings/settings.module").then((m) => m.SettingsModule),
    canActivate: [LoginGuardServiceService],
  },
  { path: "", redirectTo: "/home", pathMatch: "full" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
