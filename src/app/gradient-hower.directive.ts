import { Directive, ElementRef, HostBinding, HostListener, inject, Input } from '@angular/core';
import { IGradientConfig } from './interfaces/IGradientConfig';

@Directive({
  selector: '[gradientHower]',
})
export class GradientHowerDirective {

  @Input() gradientConfig: IGradientConfig = {
    delay: 1000,
    colors: ['#ff4545', '#00ff99', '#006aff', '#ff0095'],
    thickness: '2px'
  }

  @HostBinding('class') gradientClass!: string;
  @HostBinding('style.background-image') gradientColors!: string;
  @HostBinding('style.padding') thickness!: string;

  private el: ElementRef = inject(ElementRef);

  timer!: number;
  delay: number = this.gradientConfig.delay!;
  
  @HostListener('mouseenter')
  onEnter(): void {
    this.timer = setTimeout(() => {
      this.gradientColors = `conic-gradient(from var(--angle), ${ this.gradientConfig.colors } )`!;
      this.thickness = this.gradientConfig.thickness!;
      this.gradientClass = 'gradient';
    }, this.delay);
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.gradientClass = '';
    this.gradientColors = '';
    this.thickness = '0px';
    clearTimeout(this.timer);
  }

}
