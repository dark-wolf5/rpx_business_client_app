import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BottomAdBannerComponent } from "./bottom-ad-banner/bottom-ad-banner.component";
import { NearbyFeaturedAdComponent } from "./nearby-featured-ad/nearby-featured-ad.component";
import { HeaderAdBannerComponent } from "./header-ad-banner/header-ad-banner.component";
import { RpxPipesModule } from "../../pipes/rpx-pipes.module";

@NgModule({
  declarations: [
    HeaderAdBannerComponent,
    BottomAdBannerComponent,
    NearbyFeaturedAdComponent,
  ],
  imports: [CommonModule, RpxPipesModule],
  exports: [
    HeaderAdBannerComponent,
    BottomAdBannerComponent,
    NearbyFeaturedAdComponent,
  ],
})
export class AdsModule {}
