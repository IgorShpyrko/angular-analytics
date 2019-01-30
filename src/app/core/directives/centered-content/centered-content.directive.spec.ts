import { CenteredContentDirective } from './centered-content.directive';
import { ElementRef } from '@angular/core';


describe('CenteredContentDirective', () => {
  it('should create an instance', () => {
    const el = new ElementRef(document.createElement('button'));
    const directive = new CenteredContentDirective(el);
    expect(directive).toBeTruthy();
  });
});
