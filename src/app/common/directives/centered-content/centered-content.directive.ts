import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCenteredContent]'
})
export class CenteredContentDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.display = 'flex';
    this.el.nativeElement.style.justifyContent = 'center';
    this.el.nativeElement.style.alignItems = 'center';
  }

}
