# Skeleton Testkits

> Testkit for the skeleton component

## Skeleton TestKit API

| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| exists | - | bool | fulfilled if component exists & mounted |
| lines | - | array | returns an array of placeholder lines elements |
| chunks | - | array | returns an array of the visible 'chunks' of the placeholder lines |
| concealers | - | array | return an array of the concealing elements of the placeholder lines |
| isFirstLine | domElement (line) | bool | fulfilled if line has class '.first' |
| inSmallSpacing | domElement (line) | bool | fulfilled if line has class '.small' |
| inMediumSpacing | domElement (line) | bool | fulfilled if line has class '.medium' |
| inLargeSpacing | domElement (line) | bool | fulfilled if line has class '.large' |
| inMiddleAlignment | domElement (line) | bool | fulfilled if line has class '.middle' |
| smallSize | domElement (chunk/concealer) | bool | fulfilled if element has class '.small' |
| mediumSize | domElement (chunk/concealer) | bool | fulfilled if element has class '.medium' |
| largeSize | domElement (chunk/concealer) | bool | fulfilled if element has class '.large' |

## Usage Example

> Unit testing example

```javascript
  import React from 'react';
  import {skeletonTestkitFactory} from 'wix-style-react/dist/testkit';
  import {skeletonTestkitFactory as enzymeSkeletonTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';

  /***************
   enzyme example
  ***************/

  const dataHook = 'myDataHook';
  const wrapper = mount(
    <div>
      <Skeleton dataHook={dataHook} content={[{ type: 'line', size: 'small' }]}/>
    </div>
  );
  const testkit = enzymeSkeletonTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.driver.exists()).toBeTruthy();

  /**********************
   ReactTestUtils example
  **********************/

  const div = document.createElement('div');
  const dataHook = 'myDataHook';
  const wrapper = div.appendChild(
    ReactTestUtils.renderIntoDocument(
      <div>
        <Skeleton dataHook={dataHook} content={[{ type: 'line', size: 'small' }]}/>
      </div>,
      {dataHook}
    )
  );
  const testkit = skeletonTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.driver.exists()).toBeTruthy();
```
> E2E example

```javascript
  //Element should be rendered with a data-hook and content into the DOM
  <Skeleton dataHook='myDataHook' content={[{ type: 'line', size: 'small' }]}/>

  /*******************
   protractor example
  *******************/

  import {skeletonTestkitFactory, waitForVisibilityOf} from 'wix-style-react/dist/testkit/protractor';

  //Create an element testkit via the data-hook attribute
  const testkit = skeletonTestkitFactory({dataHook: 'myDataHook'});

  browser.get(appUrl); //Your application url

  waitForVisibilityOf(testkit.element(), 'Cannot find Skeleton')
     .then(() => {
        //Do tests
        expect(testkit.element().isDisplayed()).toBeTruthy();
     });

```

