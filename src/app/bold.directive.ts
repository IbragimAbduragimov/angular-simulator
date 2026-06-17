import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[boldHower]',
})
export class BoldHowerDirective {

  constructor(private el: ElementRef) { }

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


