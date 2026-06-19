import { Directive, ElementRef, HostBinding, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[boldOnHover]',
})
export class BoldOnHoverDirective {

  private el: ElementRef = inject(ElementRef)

  @HostBinding('style.font-weight') textWeight: number = 500;

  @HostListener('mouseenter')
  onEnter(): void {
    this.textWeight = 700;
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.textWeight = 500;
  }
}


