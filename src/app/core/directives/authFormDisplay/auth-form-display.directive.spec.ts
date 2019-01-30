import { AuthFormDisplayDirective } from './auth-form-display.directive';
import { ElementRef } from '@angular/core';

describe('AuthFormDisplayDirective', () => {
  it('should create an instance', () => {
    const el = new ElementRef(document.createElement('form'));
    const directive = new AuthFormDisplayDirective(el);
    expect(directive).toBeTruthy();
  });
});
