import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPassHelp]'
})
export class PassHelpDirective {

  constructor(private el: ElementRef) {};

  @HostListener('mouseenter') onMouseEnter() {
    this.show(true)
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.show(false);
  }

  private show(isVisible: boolean) {
    console.log('enter')
    this.el.nativeElement.firstElementChild.style.visibility = isVisible ? 'visible' : 'hidden'
  }
}
