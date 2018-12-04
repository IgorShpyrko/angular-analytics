import { BtnDirectiveDirective } from './btn-directive.directive';
import { ElementRef } from '@angular/core';

describe('BtnDirectiveDirective', () => {
  it('should create an instance', () => {
    const el = new ElementRef(document.createElement('button'));
    const directive = new BtnDirectiveDirective(el);
    expect(directive).toBeTruthy();
  });
});
