# TextButton Testkits

> TextButton

## TextButton TestKit API

| method     | arguments | returned value | description                        |
| ---------- | --------- | -------------- | ---------------------------------- |
| exists     | -         | boolean        | returns true if element in the DOM |
| click      | -         | element        | clicks on an element               |
| getText    | -         | string         | returns value of action text       |
| isDisabled | -         | boolean        | true if disabled prop is passed    |

## Usage Example

> ReactTestUtils example

```js
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {textButtonTestkitFactory} from 'wix-style-react/dist/testkit';

const div = document.createElement('div');
const dataHook = 'myDataHook';

const textButton = <div/><TextButton dataHook={dataHook}>Click me</TextButton></div>;
const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(textButton, {dataHook}));
const testkit = textButtonTestkitFactory({wrapper, dataHook});

//Do tests
describe('ReactTestUtils test', async () => {
  expect(await testkit.exists()).toBeTruthy();
})
```

> Enzyme example

```javascript
import React from 'react';
import {textButtonTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';

const dataHook = 'myDataHook';
const textButton = <div/><TextButton dataHook={dataHook}>Click me</TextButton></div>;
const wrapper = mount(textButton);
const testkit = textButtonTestkitFactory({wrapper, dataHook});

//Do tests
describe('Enzyme test', async () => {
  expect(await testkit.exists()).toBeTruthy();
})
```

> Puppeteer example

```javascript
import puppeteer from 'puppeteer'
import { textButtonTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer'

//puppeteer setup
const browser = await puppeteer.launch()
const page = await browser.newPage()

const testkit = await textButtonTestkitFactory({ dataHook: 'myDataHook', page })

browser.get(appUrl) //Your application url

//Do tests
describe('Enzyme test', async () => {
  expect(await testkit.exists()).toBeTruthy()
})
```

> Protractor example

```javascript
import { textButtonTestkitFactory } from 'wix-style-react/dist/testkit/protractor'

const testkit = textButtonTestkitFactory({ dataHook: 'myDataHook' })

browser.get(appUrl) //Your application url

//Do tests
describe('Enzyme test', async () => {
  expect(await testkit.exists()).toBeTruthy()
})
```
