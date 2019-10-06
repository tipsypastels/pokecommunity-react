import React from 'react';
import { DatePickerChildProps } from '../DatePicker';
import strftime from 'strftime';

export default function DatePickerMobile({
  selectedDate,
  setSelectedDateDay,
  setSelectedDateTime,
  timeInputRef,
}: DatePickerChildProps) {
  return (
    <div className="DatePickerMobile">
      <section className="day">
        <strong className="title">
          Choose the date
        </strong>

        <input
          type="date"
          defaultValue={strftime('%Y-%m-%d', selectedDate)}
          onBlur={e => {
            /* use onBlur instead of onChange
              because it fires off a change event
              every keypress and intermediate
              states can be invalid
            */

            let [year, month, day] = e.target.value
              .split('-')
              .map(Number);

            console.log({ year, month, day });
            console.log(new Date(year, month, day));

            setSelectedDateDay(new Date(year, month, day));
          }}
          min={strftime('%Y-%m-%d')}
        />
      </section>

      <section className="time">
        <strong className="title">
          Choose the time
        </strong>

        <input
          type="time"
          ref={timeInputRef}
          value={strftime('%H:%M', selectedDate)}
          onChange={e => {
            let [hours, minutes] = e.target.value
              .split(':')
              .map(Number);

            setSelectedDateTime(hours, minutes);
          }}
        />
      </section>
    </div>
  )
}
