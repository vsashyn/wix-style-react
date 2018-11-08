import Skeleton from '../../src/Skeleton';
import {Category} from '../storiesHierarchy';

export default {
  category: Category.COMPONENTS,
  storyName: 'Skeleton',
  component: Skeleton,
  componentPath: '../../src/Skeleton',

  componentProps: () => ({}),

  hiddenProps: ['dataHook'],

  exampleProps: { }
};
