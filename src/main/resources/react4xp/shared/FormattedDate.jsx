import React from 'react';

function FormattedDate(props) {

    if (props.date) {

        const dateObj = new Date(props.date)

        return (
            <span class='localFormattedDate'>{dateObj.toLocaleDateString()}</span>
        )
    } else {
        return <span>{props.date}</span>
    }
}

export default (props) =>
    <FormattedDate {...props}/>
