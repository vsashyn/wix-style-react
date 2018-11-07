import {textButtonDriverFactory as publicTextButtonDriver} from './TextButton.driver';

export const textButtonPrivateDriverFactory = base => {
  return {
    ...publicTextButtonDriver(base),
    suffixExists: async () => await base.$('[data-hook="suffix"]').exists(),
    prefixExists: async () => await base.$('[data-hook="prefix"]').exists()
  };
};
