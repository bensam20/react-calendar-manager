import React, { useContext, useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { CommonContext } from '../HomePage';
import CustomCalendar from './CustomCalendar';

function CalendarComponent() {
  const [value, onChange] = useState(new Date());
  const commonCtx = useContext(CommonContext);

  const dayClicked = (day) => {
    commonCtx.setDateSelected(day);
    commonCtx.openModal();
    console.log(day)
  }

  return (
    <div>
      <CustomCalendar onDayClick={(day) => dayClicked(day)}/>
    </div>
  )
}

export default CalendarComponent