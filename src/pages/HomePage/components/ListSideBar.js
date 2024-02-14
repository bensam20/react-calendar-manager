import React, { useContext, useState } from 'react'
import { CommonContext } from '../HomePage'

function ListSideBar() {
    const commonCtx = useContext(CommonContext);
    const [eventToEdit, setEventToEdit] = useState();
    const [editIndex, setEditIndex] = useState();
    let eventNameInput, eventTypeSelect, descriptionTextarea;

    const dateFormatter = (date) => {
        const options = { month: 'long', day: '2-digit', year: 'numeric' };
        const formattedDate = date?.toLocaleDateString('en-US', options);
        return formattedDate?.charAt(0).toUpperCase() + formattedDate?.slice(1);
    }

    const onEventClick = (index, item) => {
        setEditIndex(index);
        commonCtx.setIsEventEdit(true);
        setEventToEdit(commonCtx.events[index]);
    }

    const goBack = () => {
        commonCtx.setIsEventEdit(false);
    }

    const saveEvent = () => {
        let storedEvents = commonCtx.events;
        storedEvents.forEach((event, index) => {
            if (index === editIndex) {
                event.eventDate = eventToEdit.eventDate
                event.eventName = eventNameInput.value;
                event.eventType = eventTypeSelect.value;
                event.eventDesc = descriptionTextarea.value;
            }
        });
        localStorage.setItem('events', JSON.stringify(storedEvents));
        commonCtx.setIsEventEdit(false);
    }

    const deleteEvent = () => {
        let storedEvents = commonCtx.events;
        const updatedEvents = storedEvents.filter((event, index) => index !== editIndex);
        localStorage.setItem('events', JSON.stringify(updatedEvents));
        commonCtx.setIsEventEdit(false);
        commonCtx.setEvents(JSON.parse(localStorage.getItem('events')));
    }

  return (
    <div style={{width:"400px", height: "100vh", marginLeft: "auto", marginRight: "10px"}}>
        <div style={{marginBottom:"5px"}}><strong style={{fontSize:"20px"}}>My Calendar Items</strong></div>
        <div className='events-list-box'>
            {!commonCtx.isEventEdit ?
                commonCtx.events.map((item, index) => (
                    <div key={index} className='event-item' onClick={() => onEventClick(index, item)}>
                        <div className='event-date' >{dateFormatter(new Date(item.eventDate))}</div>
                        <div className='event-name' >{item.eventName}</div>
                        <div className='event-arrow'>{'>'}</div>
                    </div>
                ))
                
                :

                <>
                   <div className='event-item'>
                        <div className='event-arrow' onClick={goBack}>{'<'}</div>
                        <div className='event-date' >{dateFormatter(new Date(eventToEdit?.eventDate))}</div>
                        <div className='event-name' >{eventToEdit?.eventName}</div>
                    </div>
                    <div>
                        <div style={{marginTop:"20px"}}>
                        <input ref={input => eventNameInput = input} style={{width:"100%", height:"30px"}} type="text" placeholder="Event Name" defaultValue={eventToEdit.eventName}/>
                        </div>
                        <div style={{marginTop:"20px"}}>
                        <select ref={select => eventTypeSelect = select} style={{width:"100%", height:"30px"}} placeholder="Select Event Type" defaultValue={eventToEdit.eventType}>
                            <option value="Meetings">Meetings</option>
                            <option value="Reminders">Reminders</option>
                            <option value="Birthdays">Birthdays</option>
                            <option value="Tasks">Tasks</option>
                        </select>
                        </div>
                        <div style={{marginTop:"20px"}}>
                        <textarea ref={textarea => descriptionTextarea = textarea} style={{width:"100%", height:"80px"}} placeholder="Description" defaultValue={eventToEdit.eventDesc}></textarea>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                        <button onClick={saveEvent}>Save</button>
                        <button type="button" onClick={goBack}>Cancel</button>
                        <button type="button" onClick={deleteEvent}>Delete</button>
                        </div>
                    </div>
                </>

            }
        </div>
    </div>
  )
}

export default ListSideBar