const EC = protractor.ExpectedConditions;

const calendarDriverFactory = component => {
  const getYear = year => {
    const MAX_YEAR = 2028;
    const index = MAX_YEAR - year;
    return component.$(`[data-hook='dropdown-item-${index}']`);
  };
  const getCalendar = () => component.$('.DayPicker');
  const getNthAvailableDay = n => component.$$('[role="gridcell"]:not([class*="outside"])').get(n);
  const getYearDropdown = () => component.$('[data-hook="datepicker-year-dropdown-button"]');
  const getNthYear = n => component.$(`[data-hook="datepicker-year-dropdown"] [data-hook="dropdown-item-${n}"]`);
  const getMonthsDropdown = () => component.$('[data-hook="datepicker-month-dropdown-button"]');
  const getNthMonth = n => component.$(`[data-hook="datepicker-month-dropdown-menu"] [data-hook="dropdown-item-${n === 0 ? n : n - 1}"]`);
  const getCalendarWrapper = () => component.$('.DayPicker-wrapper');
  const getKeyboardSelectedDay = () => component.$('.DayPicker-Day:focus');
  const getSelectedDays = () => component.$$('[role="gridcell"][aria-selected=true]');

  return {
    getElement: () => getCalendar(),
    exists: () => getCalendar().isPresent(),
    isYearInViewPort: year => browser.wait(EC.visibilityOf(getYear(year)), 5000),
    isVisible: () => getCalendar().isDisplayed(),
    getSelectedDays: () => getSelectedDays().map(elem => elem.getText()),
    clickOnNthAvailableDay: (n = 0) => getNthAvailableDay(n).click(),
    openYearDropdownOptions: () => getYearDropdown().click(),
    clickOnNthYear: (n = 1) => getNthYear(n).click(),
    openMonthDropdownOptions: () => getMonthsDropdown().click(),
    clickOnNthMonth: (n = 0) => getNthMonth(n).click(),
    pressEscKey: () => getCalendarWrapper().sendKeys(protractor.Key.ESCAPE),
    pressTabKey: () => getCalendarWrapper().sendKeys(protractor.Key.TAB),
    pressEnterKey: () => getKeyboardSelectedDay().sendKeys(protractor.Key.ENTER),
    pressArrowRightKey: () => getKeyboardSelectedDay().sendKeys(protractor.Key.ARROW_RIGHT),
    pressArrowLeftKey: () => getKeyboardSelectedDay().sendKeys(protractor.Key.ARROW_LEFT)
  };
};

export default calendarDriverFactory;
