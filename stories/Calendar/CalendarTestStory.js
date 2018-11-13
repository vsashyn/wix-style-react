import React from 'react';
import queryString from 'query-string';
import pick from 'lodash/pick';

import {storiesOf} from '@storybook/react';
import {getTestStoryKind, Category} from '../storiesHierarchy';
import Calendar from 'wix-style-react/Calendar';


storiesOf(getTestStoryKind({category: Category.INPUTS, storyName: '3.13 Calendar'}), module)
  .add('1. selectedDays', () => {
    const selectedDaysParam = pick(queryString.parse(window.location.search), 'selectedDays');

    const obj = selectedDaysParam.selectedDays ? JSON.parse(selectedDaysParam.selectedDays) : JSON.parse(JSON.stringify(new Date()));
    let selectedDays;
    if (typeof obj === 'object') {
      selectedDays = {};
      selectedDays.from = new Date(Date.parse(obj.from));
      selectedDays.to = new Date(Date.parse(obj.to));
    } else {
      selectedDays = new Date(Date.parse(obj));
    }
    return (
      <div>
        <Calendar
          dataHook="calendar"
          selectedDays={selectedDays}
          />
      </div>
    );
  }
);
