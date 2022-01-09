import react, { useState, useEffect } from "react";
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  
  useEffect(() => {
    phonebookService
      .getAll()
      .then(allPersons => {
        console.log(allPersons)
        setPersons(allPersons)
      })
  }, [])

  const personsToShow = persons.filter(person => 
                                      person.name.toLowerCase().includes(filter.toLowerCase()))

  const isInPhoenbook = (person) => {
    return person.name === newName
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    console.log(newName)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if (persons.findIndex(isInPhoenbook) !== -1) {
      if(window.confirm(`${newName} is already added to
                        the phonebook, replace the old number
                        with the new one?`)) {
        let person = persons.find(person => person.name === newName)
        let updatedPerson = {...person, number: newNumber}
        phonebookService.updatePerson(person.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => returnedPerson.id !== person.id ? person : returnedPerson))
          })
      }
    }
    else {
      const person = {
        name: newName,
        number: newNumber
      }
      phonebookService
        .createPerson(person)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const filterPhonebook = (event) => {
    setFilter(event.target.value)
  }

  const deletePersonEventHandler = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebookService
        .deletePerson(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} eventHandler={filterPhonebook} />
      <h3>add a new</h3>
      <PersonForm
        addNameEventHandler={addName}
        name={newName}
        nameChangeEventHandler={handleNameChange}
        number={newNumber}
        numberChangeEventHandler={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow}
               deletePersonEventHandler={deletePersonEventHandler}/>
    </div>
  )
}

export default App;