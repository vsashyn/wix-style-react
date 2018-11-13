# Grid

A grid is a collection of `<Container/>`, `<Row/>` and `<Col/>` components that help laying out
content with ease.

`<Container/>` is based on `<Row/>`s with 12 `<Col/>`umns layout.

All components except for `<Container/>` can be nested.

```js
import {Container, Row, Col} from 'wix-style-react/Grid';

export default () =>
  <Container>
    <Row>
      <Col>Left</Col>
      <Col>Middle</Col>
      <Col>Right</Col>
    </Row>
  </Container>;
```

<details>
  <summary>Nested grid example</summary>

  ```js
  import {Container, Row, Col} from 'wix-style-react/Grid';

  export default () =>
    <Container>
      <Row>
        <Col>Left</Col>

        <Col>
          <Row>
            <Col span={6}>Nested left</Col>
            <Col span={6}>Nested right</Col>
          </Row>
        </Col>

        <Col>Right</Col>
      </Row>
    </Container>;
  ```
</details>

---

<details>
  <summary>`<Container/>`</summary>

  Use as wrapper for main content. Only `<Row/>`s should be its children.

  By default it has `minWidth: 894px` and `maxWidth: 1254px`. Add `fluid` prop to remove those widths.

  `fluid` allows to use grid for any content, be it big (whole page layout) or small (form element layout, for example).

  | propName  | propType | defaultValue | isRequired | description                                           |
  | ---       | ---      | ---          | ---        | ---                                                   |
  | children  | node     | -            | -          | Should only be `<Row/>`s although any node is allowed |
  | className | string   | -            | -          | Specify custom className for any css tweaks           |
  | fluid     | bool     | false        | -          | disable min/max width, use for smaller grids          |

  ---

  > **Note**: when `<Container/>` is used as full width component, it is possible for horizontal
  > scrollbar to appear. It is because of negative margins on `<Row>`s that come from bootstrap
  > (which `<Container/>`, `<Row/>` and `<Col/>` are based on).
  >
  > To circumvent, use `html, body { overflow-x: hidden; }`
</details>


<details>
  <summary>`<Row/>`</summary>

  Use as wrapper for columns. Only `<Col/>`s should be its children.

  One `<Row/>` should not have more than 12 `<Col/>`s.
</details>

<details>
  <summary>`<Col/>`</summary>

  Use for any content

  | propName               | propType | defaultValue | isRequired | description                                    |
  | ---                    | ---      | ---          | ---        | ---                                            |
  | span                   | number   | -            | +          | The columns span of this column                |
  | rtl                    | bool     | -            | -          | Reverses the columns ordering                  |
  | stretchViewsVertically | bool     | -            | -          | Make all the views in that raw the same height |
</details>

<details>
  <summary>`<AutoAdjustedColumns/>`</summary>

  A row of columns with as many columns as children with the same width.
  Can be used for multiple (not more than 12) equal cards on the same row.
  If you want that the children will be the at the same height,
  just add height: 100%; to them (if there isn't already).
  if its a card just add the stretchVertically prop.

  > Note that the span of each element will be `12 % {children.length}`, so in case of result greater than 0, you'll get incomplete line
</details>
