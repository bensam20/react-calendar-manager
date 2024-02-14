import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { CommonContext } from '../HomePage';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px', // Adjust width as needed
    height: '350px',
  },
};

Modal.setAppElement('#root');

function EventModal() {
    const commonCtx = useContext(CommonContext);
    let eventNameInput, eventTypeSelect, descriptionTextarea;

    function afterOpenModal() {
        // You can perform any actions after the modal has opened
    }

    function closeModal() {
        commonCtx.setModalIsOpen(false);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const newEvent = {
            eventDate: commonCtx.dateSelected,
            eventName: eventNameInput.value,
            eventType: eventTypeSelect.value,
            eventDesc: descriptionTextarea.value
        }
        commonCtx.setEvents([
            ...commonCtx.events,
            newEvent
        ])
        localStorage.setItem('events', JSON.stringify([...commonCtx.events, newEvent]));
        closeModal();
    }

    const dateFormatter = (date) => {
        const options = { month: 'long', day: '2-digit', year: 'numeric' };
        const formattedDate = date?.toLocaleDateString('en-US', options);
        return formattedDate?.charAt(0).toUpperCase() + formattedDate?.slice(1);
    }

    return (
        <Modal
        isOpen={commonCtx.modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Create Event Modal"
        >
            <h4 style={{ position: 'absolute', top: '0px', left: '10px' }}>Create Event for {dateFormatter(commonCtx.dateSelected)}</h4>
            <form onSubmit={handleSubmit}>
                <div style={{marginTop:"40px"}}>
                <input ref={input => eventNameInput = input} style={{width:"100%", height:"30px"}} type="text" placeholder="Event Name" />
                </div>
                <div style={{marginTop:"40px"}}>
                <select ref={select => eventTypeSelect = select} style={{width:"100%", height:"30px"}} placeholder="Select Event Type">
                    <option value="">Select Event Type</option>
                    <option value="Meetings">Meetings</option>
                    <option value="Reminders">Reminders</option>
                    <option value="Birthdays">Birthdays</option>
                    <option value="Tasks">Tasks</option>
                </select>
                </div>
                <div style={{marginTop:"40px"}}>
                <textarea ref={textarea => descriptionTextarea = textarea} style={{width:"100%", height:"80px"}} placeholder="Description"></textarea>
                </div>
                <div style={{ textAlign: 'right' }}>
                <button type="submit">Create</button>
                <button type="button" onClick={closeModal}>Cancel</button>
                </div>
            </form>
        </Modal>
    );
}

export default EventModal;