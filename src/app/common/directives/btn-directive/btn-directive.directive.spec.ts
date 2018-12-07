import { BtnDirective } from 'src/app/common/directives/btn-directive/btn-directive.directive';
import { ElementRef } from '@angular/core';

describe('BtnDirective', () => {
  it('should create an instance', () => {
    const el = new ElementRef(document.createElement('button'));
    const directive = new BtnDirective(el);
    expect(directive).toBeTruthy();
  });
});
