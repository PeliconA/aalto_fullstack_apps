import React from 'react'

const Person = ({person, buttonHandler}) => {
    return(
        <p>
            {person.name} {person.number} <button type="button" onClick={() => buttonHandler(person.id, person.name)}>delete</button>
        </p>
    )
}

export default Person