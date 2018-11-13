import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBtnColor]'
})
export class BtnColorDirective {
  constructor(private el: ElementRef) { }
  
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('rgba(0, 255, 255, 0.3)');
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}