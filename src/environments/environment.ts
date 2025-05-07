// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// const ngrok = 'https://705a-2601-586-cd00-7900-f44c-5732-be35-4a05.ngrok-free.app/';
// const ngrok = 'https://ebfa-2601-c9-4000-1440-8468-739a-b62-4ce2.ngrok-free.app/';
const ngrok = "https://api.rpx.com/";
const baseUrl = "https://rpx.com/";

export const environment = {
  production: false,
  staging: false,
  baseUrl,
  googleMapsApiKey: "",
  googlePlacesApiAkey: "",
  mapId: "",
  qrCodeLoyaltyPointsScanBaseUrl: baseUrl + "loyalty-points",
  qrCodeRewardScanBaseUrl: baseUrl + "reward",
  publishableStripeKey: "",
  apiEndpoint: `${ngrok}api/`,
  fakeLocation: false,
  myLocX: 25.786286,
  myLocY: -80.186562,
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */

import "zone.js/dist/zone-error"; // Included with Angular CLI.
