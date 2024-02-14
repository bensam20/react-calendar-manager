import React, { createContext, useEffect, useState } from 'react';
import CalendarComponent from './components/CalendarComponent';
import EventModal from './components/EventModal';
import ListSideBar from './components/ListSideBar';

export const CommonContext = createContext(null);

function HomePage() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const [dateSelected, setDateSelected] = useState();
    const [isEventEdit, setIsEventEdit] = useState(false);

    useEffect(() => {
        const storedEvents = localStorage.getItem('events');
        if (storedEvents) {
            setEvents(JSON.parse(storedEvents));
        }
    }, [])

    function openModal() {
        setModalIsOpen(true);
    }

  return (
    <div className='homepage-container'>
        <CommonContext.Provider value={{
            modalIsOpen, 
            events,
            dateSelected,
            isEventEdit,
            setModalIsOpen,
            openModal,
            setEvents,
            setDateSelected,
            setIsEventEdit
        }}
        >  
            <EventModal />
            <h1 className='title'>Calendar Event Manager</h1>
            <CalendarComponent className="CalendarComponent" />
            <ListSideBar className="ListSideBar" />
        </CommonContext.Provider >
    </div>
  )
}

export default HomePage