import { Directive, HostListener, EventEmitter, Output } from "@angular/core";

@Directive({
  selector: "[rpxOnScroll]",
})
export class OnScrollDirective {
  @Output() rpxOnScroll: EventEmitter<any> = new EventEmitter();

  @HostListener("scroll", ["$event"])
  onScroll(event: any): void {
    this.rpxOnScroll.emit(event);
  }
}
