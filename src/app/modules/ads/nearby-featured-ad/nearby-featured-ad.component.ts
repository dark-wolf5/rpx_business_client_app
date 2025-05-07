import {ChangeDetectorRef, Component, Input, OnChanges, OnInit,} from "@angular/core";
import {Ad} from "../../../models/ad";
import {Business} from "../../../models/business";
import {AdsService} from "../ads.service";
import {LoyaltyPointBalance} from "../../../models/loyalty-point-balance";
import {User} from "../../../models/user";
import {AllowedAccountTypes} from "../../../helpers/enum/account-type.enum";

const PLACE_TO_EAT_AD_IMAGE_MOBILE =
  "assets/images/def/places-to-eat/featured_banner_in_house.jpg";
const PLACE_TO_EAT_AD_IMAGE =
  "assets/images/def/places-to-eat/featured_banner_in_house.jpg";
const SHOPPING_AD_IMAGE =
  "assets/images/def/shopping/featured_banner_in_house.jpg";
const EVENTS_AD_IMAGE = "assets/images/def/events/featured_banner_in_house.jpg";

@Component({
  selector: "app-nearby-featured-ad",
  templateUrl: "./nearby-featured-ad.component.html",
  styleUrls: ["./nearby-featured-ad.component.css"],
})
export class NearbyFeaturedAdComponent implements OnInit, OnChanges {
  @Input() lat: number;
  @Input() lng: number;
  @Input() set user (user: User) {
    this._user = user;
    this.business = user.business;
  }
  @Input() ad: Ad = null;
  @Input() accountType: number = null;
  @Input() categories: number;
  @Input() eventsClassification: number = null;
  @Input() loyaltyPointBalance: LoyaltyPointBalance = null;

  _user: User;
  business: Business;

  displayAd: boolean = false;
  distance: number = 5;
  totalRewards: number = 0;
  adList: Array<Ad> = [];
  genericAdImage: string = PLACE_TO_EAT_AD_IMAGE;
  genericAdImageMobile: string = PLACE_TO_EAT_AD_IMAGE_MOBILE;

  constructor(
    private adsService: AdsService,
    private changeDetection: ChangeDetectorRef,
  ) {}

  ngOnChanges() {
    this.changeDetection.markForCheck();
  }

  ngOnInit(): void {
    this.getNearByFeatured();
  }

  async getNearByFeatured() {
    const adId = (!this.ad) ? 2 : this.ad.id;
    const accountType: AllowedAccountTypes = this.user.rpx_user.user_type;

    switch (accountType) {
      case AllowedAccountTypes.PlaceToEat:
        this.genericAdImage = PLACE_TO_EAT_AD_IMAGE;
        break;
      case AllowedAccountTypes.Shopping:
        this.genericAdImage = SHOPPING_AD_IMAGE;
        break;
      case AllowedAccountTypes.Events:
        this.genericAdImage = EVENTS_AD_IMAGE;
        this.categories = this.eventsClassification;
        break;
    }

    const nearByFeaturedObj = {
      loc_x: this.lat,
      loc_y: this.lng,
      categories: this.categories,
      id: adId,
      account_type: accountType,
    };

    // Retrieve the Rpx Ads
    this.adsService.getNearByFeatured(nearByFeaturedObj).subscribe((resp) => {
      this.getNearByFeaturedCallback(resp);
    });
  }

  async getNearByFeaturedCallback(resp: any) {
    if (resp.success) {
      this.ad = resp.ad;
      this.totalRewards = resp.totalRewards;
      this.displayAd = true;
    }
  }

  updateAdImage(image: string = "") {
    if (image !== "") {
      this.ad.images_mobile = image;
      this.ad.images = image;
      this.genericAdImage = image;
      this.genericAdImageMobile = image;
    }
  }

  getAdWrapperClass() {
    return "rpx-ad-wrapper-header sb-mobileAdWrapper";
  }

  getAdStyle() {
    return {
      position: "relative",
      margin: "0 auto",
      right: "0",
    };
  }
}
