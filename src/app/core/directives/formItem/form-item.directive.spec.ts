import { FormItemDirective } from './form-item.directive';
import { ElementRef } from '@angular/core';

describe('FormItemDirective', () => {
  it('should create an instance', () => {
    const el = new ElementRef(document.createElement('div'));
    const directive = new FormItemDirective(el);
    expect(directive).toBeTruthy();
  });
});
