import { Component, ChangeDetectionStrategy } from "@angular/core";
import { UserauthService } from "./services/userauth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  user$ = this.userAuthService.user$;

  constructor(
    private userAuthService: UserauthService,
  ) {}

  ngOnInit() {}
}
