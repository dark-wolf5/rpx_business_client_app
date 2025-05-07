import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-menu-logged-out",
  templateUrl: "./menu-logged-out.component.html",
  styleUrls: [],
})
export class MenuLoggedOutComponent {
  @Output() myFavoritesEvt = new EventEmitter();
  @Output() openHome = new EventEmitter();

  constructor() {}
}
