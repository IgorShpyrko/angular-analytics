import { LinkColorDirective } from './link-color.directive';
import { ElementRef } from '@angular/core';

describe('LinkColorDirective', () => {
  it('should create an instance', () => {
    const el = new ElementRef(document.createElement('a'));
    const directive = new LinkColorDirective(el);
    expect(directive).toBeTruthy();
  });
});
