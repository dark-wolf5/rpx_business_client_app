import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {AndroidSettings, IOSSettings, NativeSettings} from "capacitor-native-settings";

@Component({
  selector: 'app-location-disabled-modal',
  templateUrl: './location-disabled-modal.component.html',
  styleUrls: ['./location-disabled-modal.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class LocationDisabledModalComponent  implements OnInit {
  @Output('retryLocation') retryLocation = new EventEmitter();

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  openAppSettings() {
    NativeSettings.open({
      optionAndroid: AndroidSettings.ApplicationDetails,
      optionIOS: IOSSettings.App,
    });
  }

  mobileStartLocation() {

  }

  close() {
    this.modalController.dismiss();
  }
}
