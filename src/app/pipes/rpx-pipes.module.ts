import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SanitizePipe } from "./sanitize.pipe";
import { SafePipe } from "./safe.pipe";
import { DefaultImagePipe } from "./default-image.pipe";
import { DateFormatPipe, TimeFormatPipe } from "./date-format.pipe";
import { NumberFormatPipe } from "./number-format.pipe";
import { SortOrderPipe } from "./sort-order.pipe";
import { TruncateTextPipe } from "./truncate-text.pipe";

@NgModule({
  declarations: [
    SanitizePipe,
    SafePipe,
    DefaultImagePipe,
    DateFormatPipe,
    TimeFormatPipe,
    NumberFormatPipe,
    SortOrderPipe,
    TruncateTextPipe,
  ],
  imports: [CommonModule],
  exports: [
    SanitizePipe,
    SafePipe,
    DefaultImagePipe,
    DateFormatPipe,
    TimeFormatPipe,
    NumberFormatPipe,
    SortOrderPipe,
    TruncateTextPipe,
  ],
})
export class RpxPipesModule {}
