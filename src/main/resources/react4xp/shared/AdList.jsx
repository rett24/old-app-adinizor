import React, {useState, useRef} from 'react';

import AdListItem from './AdListItem';


function AdList(props) {

    log.info("--------------------------------------------------------");
    log.info("Props: %s", JSON.stringify(props, null, 4));

    const listItems = props.ads.map((ad) => {
        return (
            <AdListItem key={ad._id} ad={ad}/>
        )
    });

    function includeNoDueDate(e) {
        console.log("Change tha value", e);
    }

    return (
        <section>
            <h2>Section header here</h2>
            <input onChange={includeNoDueDate} id="includeNoDueDate" type="checkbox" defaultChecked={true}/>
            <label htmlFor="includeNoDueDate">
                Include no dueDate
            </label>
            <ul>{listItems}</ul>
        </section>
    )
}

export default (props) => <AdList {...props} />;
