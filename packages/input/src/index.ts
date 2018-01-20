import { FrameworkConfiguration, PLATFORM, ValueAttributeObserver, bindingMode } from 'aurelia-framework';
import { AureliaUX } from '@aurelia-ux/core';

export { UxInputTheme } from './ux-input-theme';
export { UxInput, UxInputElement } from './ux-input';

export function configure(config: FrameworkConfiguration) {
  config.container.get(AureliaUX).registerUxElementConfig(uxInputConfig);
  config.globalResources([
    PLATFORM.moduleName('@aurelia-ux/input/ux-input')
  ]);
}

const uxInputConfig = {
  tagName: 'ux-input',
  properties: {
    value: {
      defaultBindingMode: bindingMode.twoWay,
      getObserver(element: Element) {
        return new ValueAttributeObserver(element, 'value', uxInputChangeHandler);
      }
    }
  }
};

const uxInputChangeHandler = {
  subscribe(target: Element, callbackOrListener: EventListenerOrEventListenerObject) {
    target.addEventListener('change', callbackOrListener, false);

    return function() {
      target.removeEventListener('change', callbackOrListener, false);
    };
  }
};
