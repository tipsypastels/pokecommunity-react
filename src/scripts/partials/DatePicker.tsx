import React, { useState, useEffect, useCallback } from 'react';
import { getSurroundingMonths, isPast, Datelike, daysInMonth, isToday, cloneDate } from '../helpers/DateHelpers';
import Icon from './Icon';
import ClickHandler from './ClickHandler';
import { mapNumericRange, partitionThenMap } from '../helpers/ArrayHelpers';
import strftime from 'strftime';
import ClockWithMovableHands from './ClockWithMovableHands';

const MONTHS = [
  { name: 'January',   icon: 'snowman' },
  { name: 'February',  icon: 'heart' },
  { name: 'March',     icon: 'egg' },
  { name: 'April',     icon: 'flower-tulip' },
  { name: 'May',       icon: 'umbrella-beach' },
  { name: 'June',      icon: 'sunglasses' },
  { name: 'July',      icon: 'island-tropical' },
  { name: 'August',    icon: 'sunset' },
  { name: 'September', icon: 'wheat' },
  { name: 'October',   icon: 'leaf-maple' },
  { name: 'November',  icon: 'snowflakes' },
  { name: 'December',  icon: 'tree-christmas' }
];

const DAYS = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday',
  'Thursday', 'Friday', 'Saturday',
];

export function isPastMonth(date: Datelike): boolean {
  const now = new Date();
  return isPast(date, new Date(now.getFullYear(), now.getMonth(), 1));
}

interface IProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export default function DatePicker({ selectedDate, setSelectedDate }: IProps) {
  const [page, setPage] = useState(selectedDate);
  const surroundingMonths = getSurroundingMonths(page);
  const canGotoPrevMonth = !isPastMonth(surroundingMonths.prev);

  function setSelectedDateDay(date: Date) {
    let newSelectedDate = cloneDate(selectedDate);

    newSelectedDate.setFullYear(date.getFullYear());
    newSelectedDate.setMonth(date.getMonth());
    newSelectedDate.setDate(date.getDate());

    setSelectedDate(newSelectedDate);
  }

  function setSelectedDateTime(hours: number, minutes: number) {
    let newSelectedDate = cloneDate(selectedDate);

    newSelectedDate.setHours(hours);
    newSelectedDate.setMinutes(minutes);

    setSelectedDate(newSelectedDate);
  }

  const [holdingClick, setHoldingClick] = useState<'prev' | 'next'>(null);

  const oneMonthAgo = useCallback(() => {
    if (canGotoPrevMonth) {
      setPage(surroundingMonths.prev);
    } 
  }, [surroundingMonths, canGotoPrevMonth]);

  const oneMonthFromNow = useCallback(() => {
    setPage(surroundingMonths.next);
  }, [surroundingMonths]);

  useEffect(() => {
    if (holdingClick) {
      const interval = setInterval(() => {
        if (holdingClick === 'prev') {
          oneMonthAgo();
        } else {
          oneMonthFromNow();
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [holdingClick, oneMonthAgo, oneMonthFromNow]);

  let dayNodes = mapNumericRange(0, daysInMonth(page), day => {
    const date = new Date(page.getFullYear(), page.getMonth(), day + 1);
    const canClick = !isPast(date);

    return (
      <td 
        key={day}
        className={`
          ${isToday(date, selectedDate) && 'active'}
          ${!canClick && 'disabled'}
        `}
        onClick={() => canClick && setSelectedDateDay(date)}
      >
        {day + 1}
      </td>
    )
  });

  // add blank days accounting for what day the month starts on
  dayNodes = new Array(surroundingMonths.current.getDay())
    .fill(undefined)
    .map((_, i) => <td key={`blank-${i}`}></td>)
    .concat(dayNodes);

  return (
    <div className="DatePicker">
      <div className="day-picker">
        <nav className="month-switcher">
          <div className={`nav nav-prev ${!canGotoPrevMonth && 'disabled'}`}>
            <ClickHandler
              onClick={oneMonthAgo}
              onHoldClick={() => setHoldingClick('prev')}
              onHoldRelease={() => setHoldingClick(null)}
            >
              <Icon name="caret-left" />
            </ClickHandler>
          </div>

          <div className="month-name">
            <Icon 
              name={MONTHS[page.getMonth()].icon} 
              fw mr={1}
              className="month-icon" 
            />
            
            {MONTHS[page.getMonth()].name} {page.getFullYear()}
          </div>

          <div className="nav nav-next">
            <ClickHandler 
              onClick={oneMonthFromNow}
              onHoldClick={() => setHoldingClick('next')}
              onHoldRelease={() => setHoldingClick(null)}
            >
              <Icon name="caret-right" />
            </ClickHandler>
          </div>
        </nav>

        <table className="month-days">
          <thead>
            <tr>
              {DAYS.map(day => (
                <th key={day}>{day.slice(0, 3)}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {partitionThenMap(dayNodes, 7, (nodes, key) => (
              <tr key={key}>{nodes}</tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="time-picker">
        <div className="time-at">
          <ClockWithMovableHands 
            hours={selectedDate.getHours()}
            minutes={selectedDate.getMinutes()}
          />
        </div>

        <input 
          type="time" 
          value={strftime('%H:%M', selectedDate)}
          onChange={e => {
            let [hours, minutes] = e.target.value
              .split(':')
              .map(n => +n);

            setSelectedDateTime(hours, minutes);
          }} 
        />
      </div>
    </div>
  )
}
