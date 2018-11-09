import {baseUniDriverFactory} from 'wix-ui-test-utils/base-driver';
export const iconButtonDriverFactory = base => {
  base = base.$('[data-hook="iconButton-core"]');
  return {
    ...baseUniDriverFactory(base),
    getTextContent: async () => await base.text(),
    isDisabled: async () => !!(await base.attr('disabled'))
  };
};
