import styles from './Calendar.scss';
import React from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker/DayPicker';
import addMonths from 'date-fns/add_months';
import startOfMonth from 'date-fns/start_of_month';
import classNames from 'classnames';
import deprecationLog from '../utils/deprecationLog';

import WixComponent from '../BaseComponents/WixComponent';
import localeUtilsFactory from '../LocaleUtils';
import DatePickerHead from './DatePickerHead';

export default class Calendar extends WixComponent {
  static displayName = 'Calendar';

  static defaultProps = {
    locale: 'en',
    className: '',
    filterDate: () => true,
    shouldCloseOnSelect: true,
    rtl: false,
    onClose: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      month: this._getMonth(props),
      rangeSelection: {}
    };
  }

  // TODO: Change to getDerivedStateFromProps with React ^16.0.0
  componentWillReceiveProps(nextProps) {
    this.setState({month: this._getMonth(nextProps)});
  }

  _setMonth = month => this.setState({month});

  _handleDayClick = (value, modifiers = {}) => {
    if (this.props.selectionMode === 'range') {
      if (!this.state.rangeSelection.from || this.state.rangeSelection.to) {
        this.setState({rangeSelection: {from: value}});
      } else {
        const newVal = {from: this.state.rangeSelection.from, to: value};
        this.setState({rangeSelection: newVal});
        (this.props.onSelectedDaysChange || this.props.onChange)(value, modifiers);
        this.props.shouldCloseOnSelect && this.props.onClose();
      }
    } else {
      (this.props.onSelectedDaysChange || this.props.onChange)(value, modifiers);
      this.props.shouldCloseOnSelect && this.props.onClose();
    }
  };

  _getMonth = props => {
    const {
      value,
      selectedDays
    } = props;

    const {from, to} = selectedDays || {};
    return from || to || selectedDays || value;
  }

  _createDayPickerProps = () => {
    const {
      locale,
      showMonthDropdown,
      showYearDropdown,
      filterDate,
      excludePastDates,
      value: propsValue,
      selectedDays,
      rtl,
      twoMonths
    } = this.props;

    const month = this.state.month || this._getMonth(this.props) || new Date();
    const localeUtils = localeUtilsFactory(locale);
    const from = (selectedDays || {}).from;
    const to = (selectedDays || {}).to;
    const singleDay = !from && !to && selectedDays;

    const firstOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const lastOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    const captionElement = (
      <DatePickerHead
        {...{
          date: month,
          showYearDropdown,
          showMonthDropdown,
          localeUtils,
          rtl,
          onChange: this._setMonth,
          onLeftArrowClick: () =>
            this._setMonth(startOfMonth(addMonths(month, -1))),
          onRightArrowClick: () =>
            this._setMonth(startOfMonth(addMonths(month, 1)))
        }}
        />
    );

    return {
      disabledDays: excludePastDates ?
        {before: new Date()} :
        date => !filterDate(date),
      initialMonth: month,
      initialYear: month,
      selectedDays: selectedDays || propsValue,
      month,
      year: month,
      firstDayOfWeek: 1,
      locale: typeof locale === 'string' ? locale : '',
      fixedWeeks: true,
      onKeyDown: this._handleKeyDown,
      onDayClick: this._handleDayClick,
      localeUtils,
      navbarElement: () => null,
      captionElement,
      onDayKeyDown: this._handleDayKeyDown,
      numberOfMonths: twoMonths ? 2 : 1,
      className: twoMonths ? 'DayPicker--TwoMonths' : '',
      modifiers: {start: from, end: to, firstOfMonth, lastOfMonth, singleDay}
    };
  };

  _handleKeyDown = event => {
    const keyHandler = this.keyHandlers[event.keyCode];

    keyHandler && keyHandler();
  };

  keyHandlers = {
    // escape
    27: this.props.onClose,

    // tab
    9: this.props.onClose
  };

  _focusSelectedDay = dayPickerRef => {
    if (dayPickerRef) {
      this.dayPickerRef = dayPickerRef;
      const selectedDay = this.dayPickerRef.dayPicker.querySelector(
        '.DayPicker-Day--selected'
      );

      if (selectedDay) {
        selectedDay.classList.add('DayPicker-Day--unfocused');
        selectedDay.focus();
      }
    }
  };

  _handleDayKeyDown = () => {
    const unfocusedDay = this.dayPickerRef.dayPicker.querySelector(
      '.DayPicker-Day--unfocused'
    );

    if (unfocusedDay) {
      unfocusedDay.classList.remove('DayPicker-Day--unfocused');
    }
  };

  render() {
    return (
      <div className={classNames(styles.calendar, this.props.className)}>
        <DayPicker
          ref={this._focusSelectedDay}
          {...this._createDayPickerProps()}
          />
      </div>
    );
  }
}

Calendar.propTypes = {
  /** Use 2 months layout */
  /* TODO WIP, uncomment after feature done
  twoMonths: PropTypes.bool,
  */

  className: PropTypes.string,

  /** (Deprecated) Callback function called whenever the user selects a day in the calendar */
  onChange: (props, propName) => {
    if (props[propName]) {
      const msg = 'Calendar\'s onChange prop is deprecated, please use onSelectedDaysChange instead.';
      const key = msg;
      deprecationLog(msg, key);
    }
  },

  /** Callback function called whenever the user selects a day in the calendar */
  onSelectedDaysChange: PropTypes.func,

  /** Callback function called whenever user press escape or click outside of the element */
  onClose: PropTypes.func,

  /** Past dates are unselectable */
  excludePastDates: PropTypes.bool,

  /** Only the truthy dates are selectable */
  filterDate: PropTypes.func,

  /** RTL mode */
  rtl: PropTypes.bool,

  /** (Deprecated) The selected date */
  value: (props, propName) => {
    if (props[propName]) {
      const msg = 'Calendar\'s onValue prop is deprecated, please use selectedDays instead.';
      const key = msg;
      deprecationLog(msg, key);
    }
  },

  /** The selected date range. Can be either a single JS Date object, or a single range object {from: Date, to: Date} */
  selectedDays: PropTypes.object,

  /** Whether the user should be able to select a date range, or just a single day */
  selectionMode: PropTypes.oneOf(['day', 'range']),

  /** Display a selectable yearDropdown */
  showYearDropdown: PropTypes.bool,

  /** Display a selectable monthDropdown */
  showMonthDropdown: PropTypes.bool,

  /** should the calendar close on day selection */
  shouldCloseOnSelect: PropTypes.bool,

  /** DatePicker instance locale */
  locale: PropTypes.oneOfType([
    PropTypes.oneOf([
      'en',
      'es',
      'pt',
      'fr',
      'de',
      'pl',
      'it',
      'ru',
      'ja',
      'ko',
      'tr',
      'sv',
      'no',
      'nl',
      'da'
    ]),
    PropTypes.shape({
      distanceInWords: PropTypes.object,
      format: PropTypes.object
    })
  ])
};
