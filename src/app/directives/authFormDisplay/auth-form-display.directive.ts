import { Directive, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAuthFormDisplay]'
})
export class AuthFormDisplayDirective implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.el.nativeElement.style.display = 'flex';
    this.el.nativeElement.style['flex-direction'] = 'column';
    this.el.nativeElement.style['align-items'] = 'center';
  }

}
