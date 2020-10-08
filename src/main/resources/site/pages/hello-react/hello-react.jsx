import React, {useState, useEffect, useRef} from 'react';

function App(props) {

    const [name, setName] = useState('');
    const nameRef = useRef('');

    const prevName = useRef('');

    function focus() {
        nameRef.current.focus();
    }

    useEffect(() => {
        prevName.current = name;
    }, [name])

    return (
        <div>
            <input ref={nameRef} type='text' value={name} onChange={e => setName(e.target.value)}/>
            <div>My name is {name}, previous name was {prevName.current}</div>
            <button onClick={focus}>Focus</button>
        </div>
    )
}

export default (props) => {
    return (
        <App {...props} />
    )
}