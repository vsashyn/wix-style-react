import {baseUniDriverFactory} from 'wix-ui-test-utils/base-driver';

export const textButtonDriverFactory = base => {
  base = base.$('[data-hook="button-core"]');
  return {
    ...baseUniDriverFactory(base),
    getButtonTextContent: async () => await base.text(),
    isButtonDisabled: async () => !!(await base.attr('disabled'))
  };
};
