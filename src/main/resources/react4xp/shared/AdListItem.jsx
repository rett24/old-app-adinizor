import React from 'react';
import FormattedDate from "./FormattedDate";

function AdListItem({ad}) {

    return (
        <li class='card'>
            <h1 className='heading'>
                {ad.displayName}
            </h1>
            <div>{ad.company.displayName}</div>
            <div>Published: <FormattedDate date={ad.publish.first}/></div>
            <div>Days since publish: {ad.daysOld}</div>
            <div>Days since dueDate: {ad.daysSinceDueDate}</div>
        </li>
    )
}

export default (ad) =>
    <AdListItem {...ad}/>
