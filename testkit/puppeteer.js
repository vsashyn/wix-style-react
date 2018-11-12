import 'regenerator-runtime/runtime';
import {
  puppeteerTestkitFactoryCreator,
  puppeteerUniTestkitFactoryCreator
} from 'wix-ui-test-utils/puppeteer';

import inputDriverFactory from '../src/Input/Input.puppeteer.driver';
export const inputTestkitFactory = puppeteerTestkitFactoryCreator(
  inputDriverFactory
);

import buttonDriverFactory from '../src/Backoffice/Button/Button.puppeteer.driver';
export const buttonTestkitFactory = puppeteerTestkitFactoryCreator(
  buttonDriverFactory
);

import formFieldDriverFactory from '../src/FormField/FormField.puppeteer.driver';
export const formFieldTestkitFactory = puppeteerTestkitFactoryCreator(
  formFieldDriverFactory
);

import tableDriverFactory from '../src/Table/Table.puppeteer.driver';
export const tableTestkitFactory = puppeteerTestkitFactoryCreator(
  tableDriverFactory
);

import headingDriverFactory from '../src/Heading/Heading.puppeteer.driver';
export const headingTestkitFactory = puppeteerTestkitFactoryCreator(
  headingDriverFactory
);

import textDriverFactory from '../src/Text/Text.puppeteer.driver';
export const textTestkitFactory = puppeteerTestkitFactoryCreator(
  textDriverFactory
);

import tooltipDriverFactory from '../src/Tooltip/Tooltip.puppeteer.driver';
export const tooltipTestkitFactory = puppeteerTestkitFactoryCreator(
  tooltipDriverFactory
);

// wix-ui-core (unidriver)

import {textButtonDriverFactory} from '../src/TextButton/TextButton.driver';
export const textButtonTestkitFactory = puppeteerUniTestkitFactoryCreator(
  textButtonDriverFactory
);
