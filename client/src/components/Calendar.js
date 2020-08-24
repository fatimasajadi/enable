import React, { useState, useCallback } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import * as BigCalendar from 'react-big-calendar';
import DatePicker from 'react-datetime';
import moment from 'moment';
import { FormGroup, Label, Button } from 'reactstrap';

const propTypes = {};
const localizer = BigCalendar.momentLocalizer(moment);

function Calendar() {
  const [events, setEvents] = useState([
  ]);
  const [form, setForm] = useState(null);

  const addEvent = useCallback((event) => {
    event.preventDefault();

    const { title, start, end } = form;

    setEvents((prev) => [
      {
        title,
        start: start.toDate(),
        end: end.toDate(),
      },
      ...prev,
    ]);
    setForm(null)
  }, [form])

  function handleSelect({ start, end }) {
    setForm({
      title: 'Available',
      start: moment(start),
      end: moment(end),
    })
  }

  return (
    <div style={{ height: 600, padding: 20 }} className="container">
      {
        form && (
          <form onSubmit={addEvent}>

            <FormGroup>
              <Label>From</Label>

              <DatePicker
                inputProps={{
                  style: { width: 250 }
                }}
                dateFormat="DD-MM-YYYY"
                timeFormat="hh:mm A"
                value={form.start}
                onChange={val => setForm(prev => ({ ...prev, start: val }))}
              />
            </FormGroup>

            <FormGroup>
              <Label>To</Label>

              <DatePicker
                inputProps={{
                  style: { width: 250 }
                }}
                dateFormat="DD-MM-YYYY"
                timeFormat="hh:mm A"
                value={form.end}
                onChange={val => setForm(prev => ({ ...prev, end: val }))}
              />
            </FormGroup>

            <Button >Submit</Button>
          </form>
        )
      }
      <BigCalendar.Calendar
        selectable
        view="week"
        onSelectSlot={(e) => {

        }}
        culture='en-GB'
        localizer={localizer}
        events={events}
        views={['month', 'week']}
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={handleSelect} />
    </div>
  );
}
Calendar.propTypes = propTypes
export default Calendar;