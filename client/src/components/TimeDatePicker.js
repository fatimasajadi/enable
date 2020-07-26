import React, { useState } from 'react';
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';

function TimeDatePicker() {
  const [dt, setDt] = useState(moment());

  return (
    <div className="timeDatePicker">

      <DatePicker
        inputProps={{
          style: { width: 250 }
        }}
        value={dt}
        dateFormat="DD-MM-YYYY"
        timeFormat="hh:mm A"
        onChange={val => setDt(val)}
      />

    </div>
  );
}

export default TimeDatePicker;