import React, {useEffect, useRef, useState} from 'react';
import AdList from '../shared/AdList';

function App(props) {

    return (
        <div>
            <h1>Adinizor</h1>
            <AdList {...props} />
        </div>
    )
}

export default (props) => <App {...props} />
