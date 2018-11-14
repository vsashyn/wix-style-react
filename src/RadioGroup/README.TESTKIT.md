# RadioGroup Testkits

> RadioGroup

## RadioGroup TestKit API

| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| getRadioAtIndex | index | - | get RadioButton element in a group by it's index |
| selectByIndex | index | - | click on RadioButton in a group by it's index |
| selectByValue | index | - | click on RadioButton in a group by it's value |
| getClassOfLabelAt | index | string | returns RadioButton class by it's index |
| getRadioValueAt | index | number | returns the value of the RadioButton at the given index |
| getSelectedValue | - | number | returns the value of selected RadioButton |
| isVerticalDisplay | - | bool | fulfilled if element has class ".vertical" |
| isHorizontalDisplay | - | bool | fulfilled if element has class ".horizontal" |
| isRadioChecked | index | bool | fulfilled if RadioButton in group has attribute checked |
| isRadioDisabled | index | bool | fulfilled if RadioButton in group has attribute disabled |
| getNumberOfRadios | - | number | get the amount of radio buttons |
| exists (Only in Unit Test) | - | bool | fulfilled if element in the DOM |
| element (Only in E2E) | - | element | returns the driver element |

## Usage Example

> Unit testing example

```javascript
  import React from 'react';
  import {radioGroupTestkitFactory} from 'wix-style-react/dist/testkit';
  import {radioGroupTestkitFactory as enzymeRadioGroupTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';

  /***************
   enzyme example
  ***************/

  const dataHook = 'myDataHook';
  const wrapper = mount(<div><RadioGroup dataHook={dataHook}/></div>);
  const testkit = enzymeRadioGroupTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.driver.exists()).toBeTruthy();

  /**********************
   ReactTestUtils example
  **********************/

  const div = document.createElement('div');
  const dataHook = 'myDataHook';
  const wrapper = div.appendChild(
    ReactTestUtils.renderIntoDocument(<div><RadioGroup dataHook={dataHook}/></div>, {dataHook})
  );
  const testkit = radioGroupTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.driver.exists()).toBeTruthy();
```
> E2E example

```javascript
  //Element should be rendered with a data-hook into the DOM
  <RadioGroup dataHook='myDataHook'/>

  /*******************
   protractor example
  *******************/

  import {radioGroupTestkitFactory, waitForVisibilityOf} from 'wix-style-react/dist/testkit/protractor';

  //Create an element testkit via the data-hook attribute
  const testkit = radioGroupTestkitFactory({dataHook: 'myDataHook'});

  browser.get(appUrl); //Your application url

  waitForVisibilityOf(testkit.element(), 'Cannot find RadioGroup')
     .then(() => {
        //Do tests
        expect(testkit.element().isDisplayed()).toBeTruthy();
     });

```
