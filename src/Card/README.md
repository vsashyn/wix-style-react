# `<Card/>`

A compound component for any content to be displayed in styled block.

Most often used with `<Card.Header/>`, `<Card.Content/>` and `<Card.Divider/>`.

Use [`<Row/>` and `<Col/>`](https://wix-wix-style-react.surge.sh/?selectedKind=2.%20Layout&selectedStory=Grid&full=0&addons=0&stories=1&panelRight=0) to lay out content inside `<Card.Content/>`


```js
import Card from 'wix-style-react/Card';

export default () =>
  <Card>
    <Card.Header title="Catchy Header"/>

    <Card.Content>
      Anything goes
    </Card.Content>
  </Card>
```

<details>
  <summary>`Card`</summary>

  | propName          | propType | defaultValue | isRequired | description                                                                |
  | ---               | ---      | ---          | ---        | ---                                                                        |
  | children          | node     | -            | -          | any nodes to render inside card. Ideally should be one of `<Card.Header/>` |
  | stretchVertically | bool     | false        | -          | Should this Card stretch vertically inside the container                   |
</details>

<details>
  <summary>`Card.Header`</summary>

  | propName       | propType | defaultValue | isRequired | description                                             |
  | ---            | ---      | ---          | ---        | ---                                                     |
  | title          | string   | -            | +          | The title of the card                                   |
  | subtitle       | string   | -            | -          | The subtitle of the card                                |
  | suffix         | node     | -            | -          | A component to be displayed on the right side of header |
  | withoutDivider | bool     | false        | -          | Whether to show divider or not                          |
</details>

<details>
  <summary>`Card.Content`</summary>

  | propName | propType | defaultValue | isRequired | description             |
  | ---      | ---      | ---          | ---        | ---                     |
  | children | node     | -            | -          | Any node to be rendered |
</details>

<details>
  <summary>`Card.Divider`</summary>

  Can be used in between `Card.Content`s for visual separation. Accepts no props
</details>

---
