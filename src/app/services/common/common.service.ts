import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  recursiveDeepCopy(o) {
    let newO;
    let i;
  
    if (typeof o !== 'object') return o;
    if (!o) return o;
  
    if ('[object Array]' === Object.prototype.toString.apply(o)) {
      newO = [];
      for (i = 0; i < o.length; i += 1) {
        newO[i] = this.recursiveDeepCopy(o[i]);
      }
      return newO;
    }
  
    newO = {};
    for (i in o) {
      if (o.hasOwnProperty(i)) {
        newO[i] = this.recursiveDeepCopy(o[i]);
      }
    }
    return newO;
  };
}
