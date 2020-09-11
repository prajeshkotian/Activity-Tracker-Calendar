// JavaScript source code
import React from 'react';
import './Modal.css';
import './Backdrop.css';
import Calendar from '../../container/Calendar';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

function Modal(props) {
    const activities = props.activity.length > 0 ? props.activity.map(ele => {
        return (
            <Tooltip title={ 'Starts at '+ele.start_time} placement='top-end' arrow>
                <p>{ele.title}   Start Time:  {ele.start_time}</p>
            </Tooltip>
        );
    }) : <p>No Activity Scheduled for Today!!!</p>;

    return (

        <div className='Backdrop'>
        <div className='Modal'>
            
            <span className="material-icons" onClick={() =>  props.closeModal() }>
                clear
            </span>
            <h5>Activity Tracker for Today</h5>
            {activities}
                <Button variant='outlined' onClick={ ()=>props.getCalendar()}>Complete Activity Record </Button>
            {props.showcalendar ? <Calendar user_data={props.user_data} closeCalendar={props.closeCalendar } /> : null}
            </div>
        </div>
        );
}

export default Modal;