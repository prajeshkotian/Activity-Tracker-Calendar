// JavaScript source code
import React from 'react';
import './User.css';

function User(props) {
    return (
        <div className='User' onClick={() => props.clicked(props.key_val)}>
                {props.data}  
        </div>
        );
}

export default User;