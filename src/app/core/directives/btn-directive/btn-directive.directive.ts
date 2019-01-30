import { Directive, ElementRef, HostListener } from '@angular/core';

const initialValue = {
  background: 'rgba(50, 50, 50, 0.7)',
  color: '#FFF',
  border: 'none',
  margin: '2px',
  padding: '5px 15px',
  'border-radius': '5px',
  'box-shadow': '0 0 10px rgba(0,0,0,0.5)',
  cursor: 'pointer'
}

const hoveredValue = {
  color: '#FFF',
  background: 'rgba(50, 50, 50, 0.9)'
}

const activeValue = {
  color: '#FFF',
  background: 'rgba(30, 30, 30, 0.9)'
}

@Directive({
  selector: '[appBtnDirective]'
})
export class BtnDirective {

  constructor(private el: ElementRef) {
    for (let key in initialValue) {
      this.el.nativeElement.style[key] = initialValue[key]
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(hoveredValue)
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(initialValue)
  }

  @HostListener('mousedown') onMouseDown() {
    this.highlight(activeValue)
  }

  @HostListener('mouseup') onMouseUp() {
    this.highlight(hoveredValue)
  }

  private highlight(props) {
    const { color, backgroundColor } = props;

    this.el.nativeElement.style.color = color;
    this.el.nativeElement.style.backgroundColor = backgroundColor;
  }
}
