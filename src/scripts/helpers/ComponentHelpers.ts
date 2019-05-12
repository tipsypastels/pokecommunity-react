import { ReactNode, Component } from 'react';

function IfStateOrPropsPresent(key: string, stateOrProps: 'state' | 'props') {
  return function(target, property, descriptor) {
    let originalMethod = descriptor.value;
    descriptor.value = function() {
      if (this[stateOrProps][key]) {
        return originalMethod.call(this);
      }
      return null;
    }
    return descriptor;
  }
}

export function IfStatePresent(key) {
  return IfStateOrPropsPresent(key, 'state');
}

export function IfPropsPresent(key) {
  return IfStateOrPropsPresent(key, 'props');
}