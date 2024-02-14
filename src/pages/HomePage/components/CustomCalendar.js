import React, { useState } from 'react';
import './CustomCalendar.css';

const CustomCalendar = ({onDayClick}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const today = new Date();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonthDays = Array.from(
    { length: firstDayOfMonth },
    (_, i) => new Date(currentYear, currentMonth, -i).getDate()
  ).reverse();

  const nextMonthDays = Array.from(
    { length: 42 - (daysInMonth + firstDayOfMonth) },
    (_, i) => i + 1
  );

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const allDays = [...prevMonthDays, ...daysArray, ...nextMonthDays];

  const setToday = () => {
    setCurrentDate(new Date());
  }

  const getDateObject = (day) => {
    let date = new Date(currentYear, currentMonth - 1, day);
    onDayClick(date);
  }

  return (
    <div className="calendar-container">
      <div className="calendar-nav">
        <button className="nav-button" onClick={setToday}>Today</button>
        <button className="nav-button" onClick={goToPreviousMonth}>{'<'}</button>
        <div className="calendar-heading">{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
        <button className="nav-button" onClick={goToNextMonth}>{'>'}</button>
      </div>
      <div className="calendar-grid">
        <div className="day-label">Sun</div>
        <div className="day-label">Mon</div>
        <div className="day-label">Tue</div>
        <div className="day-label">Wed</div>
        <div className="day-label">Thu</div>
        <div className="day-label">Fri</div>
        <div className="day-label">Sat</div>
        {allDays.map((day, index) => (
          <div key={index} className={`calendar-cell ${index >= firstDayOfMonth && index < (daysInMonth + firstDayOfMonth) ? 'current-month' : 'other-month'} ${(today.getDate() === day && today.getMonth() === currentDate.getMonth()) ? 'today' : ''}`} onClick={() => getDateObject(day)}>
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomCalendar;
