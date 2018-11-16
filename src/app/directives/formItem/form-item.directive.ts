import { Directive, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFormItem]'
})
export class FormItemDirective implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.el.nativeElement.style.width = '100%';
    this.el.nativeElement.style.display = 'flex';
    this.el.nativeElement.style['justify-content'] = 'space-between';
  }

}
