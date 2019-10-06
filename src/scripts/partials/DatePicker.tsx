import React, { useRef } from 'react';
import { cloneDate } from '../helpers/DateHelpers';
import { isBrowser } from 'react-device-detect';
import DatePickerBrowser from './DatePicker/DatePickerBrowser';
import DatePickerMobile from './DatePicker/DatePickerMobile';

interface IProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export interface DatePickerChildProps {
  selectedDate: Date;
  setSelectedDateDay: (day: Date) => void;
  setSelectedDateTime: (hours: number, minutes: number) => void;
  timeInputRef: React.RefObject<HTMLInputElement>;
}

export default function DatePicker({ selectedDate, setSelectedDate }: IProps) {
  const timeInputRef = useRef<HTMLInputElement>();

  function setSelectedDateDay(date: Date) {
    let newSelectedDate = cloneDate(selectedDate);

    newSelectedDate.setFullYear(date.getFullYear());
    newSelectedDate.setMonth(date.getMonth());
    newSelectedDate.setDate(date.getDate());

    setSelectedDate(newSelectedDate);

    // timeInputRef.current.focus();
  }

  function setSelectedDateTime(hours: number, minutes: number) {
    let newSelectedDate = cloneDate(selectedDate);

    newSelectedDate.setHours(hours);
    newSelectedDate.setMinutes(minutes);

    setSelectedDate(newSelectedDate);
  }

  const props = {
    selectedDate,
    setSelectedDateDay,
    setSelectedDateTime,
    timeInputRef,
  };

  if (isBrowser) {
    return <DatePickerBrowser {...props} />;
  }

  return <DatePickerMobile {...props} />;
}
