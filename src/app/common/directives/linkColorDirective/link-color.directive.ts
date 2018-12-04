import { Directive, ElementRef, HostListener, OnInit, Input } from '@angular/core';

interface Iprops {
  color: string,
  bgColor: string
};

@Directive({
  selector: '[appBtnColor]'
})
export class LinkColorDirective implements OnInit {
  private initialValue = {
    color: 'rgb(255, 255, 255)',
    bgColor: 'rgba(0, 0, 0, 0.3)'
  };

  private hoveredValue = {
    color: 'rgb(255, 255, 255)',
    bgColor: 'rgba(0, 0, 0, 0.7)'
  };

  private clickedValue = {
    color: 'rgb(255, 255, 255)',
    bgColor: 'rgba(0, 0, 0, 0.9)'
  };

  constructor(private el: ElementRef) {};

  @Input() color: string;

  ngOnInit() {
    this.highlight(this.initialValue);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.hoveredValue)
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(this.initialValue);
  }

  @HostListener('mousedown') onMouseDown() {
    this.highlight(this.clickedValue);
  }

  @HostListener('mouseup') onMouseUp() {
    this.highlight(this.hoveredValue);
  }

  private highlight(props: Iprops) {
    const { color, bgColor } = props;

    this.el.nativeElement.style.color = color;
    this.el.nativeElement.style.backgroundColor = bgColor;
  }
}
