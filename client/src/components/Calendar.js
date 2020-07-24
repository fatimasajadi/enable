import React, { useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import * as BigCalendar from 'react-big-calendar';
import moment from 'moment';

const localizer = BigCalendar.momentLocalizer(moment);

function Calendar() {
  console.log(BigCalendar)
  const [events, setEvents] = useState([
    {
      title: 'initial title',
      start: new Date(),
      end: new Date(Date.now() + 60 * 60 * 1000),
    }
  ]);
  return (
    <div style={{ height: 600, padding: 20 }} className="container">
      <BigCalendar.Calendar
        selectable
        view="week"
        onSelectSlot={(e) => {

        }}
        culture='en-GB'
        localizer={localizer}
        events={events}
        views={['month', 'week']} />
    </div>
  );
}

export default Calendar;