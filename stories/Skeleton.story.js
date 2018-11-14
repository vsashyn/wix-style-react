import Skeleton from '../../src/Skeleton';
import {Category} from '../storiesHierarchy';

const exampleContent = [
  {
    label: 'small/large/medium',
    value: [
      {
        size: 'small',
        type: 'line'
      },
      {
        size: 'large',
        type: 'line'
      },
      {
        size: 'medium',
        type: 'line'
      }
    ]
  },
  {
    label: 'small/medium',
    value: [
      {
        size: 'small',
        type: 'line'
      },
      {
        size: 'medium',
        type: 'line'
      }
    ]
  }
];

export default {
  category: Category.COMPONENTS,
  storyName: 'Skeleton',
  component: Skeleton,
  componentPath: '../../src/Skeleton',

  componentProps: {
    content: exampleContent[0].value,
    dataHook: 'storybook-skeleton'
  },

  exampleProps: {
    content: exampleContent
  }
};
