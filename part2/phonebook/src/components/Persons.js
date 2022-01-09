import React from 'react'
import Person from './Person'

const Persons = ({persons, deletePersonEventHandler}) => {
    return(
        <div>
            {persons.map(person => <Person key={person.id} 
                                           person={person}
                                           buttonHandler={deletePersonEventHandler} 
                                    />)}
        </div>
    )
}

export default Persons