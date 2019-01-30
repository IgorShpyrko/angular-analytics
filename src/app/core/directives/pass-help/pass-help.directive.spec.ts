import { PassHelpDirective } from './pass-help.directive';
import { ElementRef } from '@angular/core';

describe('PassHelpDirective', () => {
  it('should create an instance', () => {
    const el = new ElementRef(document.createElement('div'));
    const directive = new PassHelpDirective(el);
    expect(directive).toBeTruthy();
  });
});
