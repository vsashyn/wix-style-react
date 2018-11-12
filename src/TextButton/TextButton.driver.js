import {baseUniDriverFactory} from 'wix-ui-test-utils/base-driver';

export const textButtonDriverFactory = base => {
  base = base.$('[data-hook="textButton-core"]');
  return {
    ...baseUniDriverFactory(base),
    getText: async () => await base.text(),
    isDisabled: async () => !!(await base.attr('disabled'))
  };
};
