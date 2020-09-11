// JavaScript source code
import React, { Component } from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import momenttimezone from 'moment-timezone';
import './Calendar.css';

moment.locale('en-US');

const localizer = momentLocalizer(momenttimezone);


class Calendarr extends Component {
    state = {
        events: []
    };


    //When component mounts to DOM replace the date and time with formatted date and time.
    componentDidMount() {
        const activity_dates = this.props.user_data.activity_periods;
        console.log(activity_dates);

        const new_activity_dates = activity_dates.map(ele => {
            var new_startTime = this.modifyDateString(ele.start_time);
            var new_endTime = this.modifyDateString(ele.end_time);

            //console.log(new_startTime);

            return {
                "start": moment(new_startTime).toDate(),
                "end": moment(new_endTime).toDate(),
                "title": ele.title
            }
        });
        momenttimezone.tz.setDefault(this.props.user_data.tz);
        this.setState({ events: new_activity_dates });
    }


    //Method that modifies the existing string "Mar 1 2020  11:11AM" to "Mar 1 2020  11:11 AM" so that it is readable by big calendar
    modifyDateString = (string) => {
        var temp_string = '';
        if (string.includes('AM')) {
            temp_string = string.replace(/AM/g, " AM");
        }
        else if (string.includes('PM')) {
            temp_string = string.replace(/PM/g, " PM");
        }
        return temp_string;
    }

    render() {
        console.log(this.state.events);
        //console.log(momenttimezone.tz(moment('Feb 1 2020  1:33 PM').toDate(), 'America/New_York').format());
        //console.log(momenttimezone('Feb 1 2020  1:33 PM').toDate());
        
        //console.log(momenttimezone.tz.guess(true));
        //console.log(momenttimezone('Feb 1 2020  1:33 PM').toDate());
        //console.log(this.props.user_data.activity_periods);
        return (
            <div className='Calendar'>
                <span className='material-icons' onClick={()=> this.props.closeCalendar()}>clear</span>
            <Calendar
                localizer={localizer}
                step={60}
                events={this.state.events}
                defaultDate={moment().toDate()}
                style={{ height: "80vh" }}
                />
            </div>
        );
    }
}


export default Calendarr;