// JavaScript source code
import React, { Component } from 'react';
import axios from 'axios';
import User from '../../component/User/User';
import momenttimezone from 'moment-timezone';
import Modal from '../../component/Modal/Modal';
import './HomePage.css';
import { trackPromise } from 'react-promise-tracker';
import LoaderSpinner from '../../Helper/LoaderSpinner';


class HomePage extends Component {
    state = {
        users_data: [],
        error: '',
        todays_activity: [],
        user_data: {},
        show_modal: false,
        show_calendar: false
    };

    componentDidMount() {
        trackPromise(axios.get('https://calendar-api-prajesh.herokuapp.com/members')
            .then(res => {
                console.log(res.data);
                this.setState({ ...this.state, users_data: res.data });
            }
            )
            .catch(err => {
                console.log(err);
                this.setState({ ...this.state, error: 'Error Occurred during API call!!!!' });
            }
            ));
    }




    onClickHandler = async (props) => {
        console.log(props);
        this.getTodaysActivity(props);
        
    }


    getTodaysActivity = async (id) => {
        let user_data_local = {};
        //get the data for selected User
        for (let index in this.state.users_data) {
            if (this.state.users_data[index].id === id)
                user_data_local = this.state.users_data[index];
        }
        //console.log(this.state.user_data);

        //get todays Date
        let curr_date = momenttimezone().toDate().toString().split(' ');


        let todays_activity_local = [];
        //console.log(curr_date);
        //get Todays activity for the selected user to display in modal
        for (let index in user_data_local.activity_periods) {
            //if (this.state.user_data.)
            let date = user_data_local.activity_periods[index].start_time.split(' ');

            if (curr_date[1] == date[0] && parseInt(curr_date[2]) == parseInt(date[1]) && curr_date[3] == date[2]) {
                
                todays_activity_local = todays_activity_local.concat(user_data_local.activity_periods[index]);
            }

        }


        //Setting state for todays activity and showModal
        this.setState({ ...this.state, user_data: user_data_local, todays_activity: todays_activity_local, show_modal: true });
    }


    //Close the activity Modal
    closeModal = () => {
        this.setState({ ...this.state, show_modal: false });
    }

    //To Display the Calendar from Modal
    getCompleteCalendar = () => {
        this.setState({...this.state,show_calendar:true});
    }

    //close the calendar Modal
    closeCompleteCalendar = () => {
        this.setState({ ...this.state, show_calendar: false });
    }


    render() {

        console.log(this.state.todays_activity);
        const users = this.state.users_data.map(ele => {
            return (
                
                    <User data={ele.real_name} clicked={this.onClickHandler} key_val={ele.id} key={ele.id} />
                    );
        });

        return (
            <div className="UserPosition">
                
                {this.state.users_data.length > 0 ? users : <p>No users to Show!!!</p>}
                <LoaderSpinner />
                {this.state.show_modal ? <Modal activity={this.state.todays_activity} user_data={this.state.user_data} closeModal={this.closeModal} getCalendar={this.getCompleteCalendar} closeCalendar={this.closeCompleteCalendar} showcalendar={this.state.show_calendar} /> : null}
            </div>
        );
    }
}

export default HomePage;