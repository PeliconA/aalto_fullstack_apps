import react, { useState, useEffect } from "react";
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  
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

  const toggleNotification = (message, error=0) => {
    /**
    * Function to change the notification message and styling wrt if the message denotes a success or an error.
    * Parameter 'message' sets the message to be displayed, parameter 'error' sets the type of 
    * message (either error or success).
    * 
    * If null is passed as a parameter to message, the message becomes of type null as well.
    * This functioality lets us delete the message from the frontend and keep the state of the
    * application correct.
    * 
    * Ideally, the notificaton message should be changed only through this function.
    * Unfortunately, I do not know how to enforce the usage of functions while changing state
    * in React.
    */
    if (message === null) {
      setMessage(null)
      setError(null)
    }

    setMessage(message)
    setError(error)
  }
  
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
            setNewName('')
            setNewNumber('')
            toggleNotification(`Replaced phone number of ${returnedPerson.name}`, 0)
            setTimeout(() => {
              toggleNotification(null)
            }, 5000)
          })
          .catch(() => {
            setNewName('')
            setNewNumber('')
            toggleNotification(`Information of ${updatedPerson.name} has already been removed from the server`, 1)
            setTimeout(() => {
              toggleNotification(null)
            }, 5000)
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
          toggleNotification(`Added ${newPerson.name}`, 0)
          setTimeout(() => {
            toggleNotification(null)
          }, 5000)
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
        .then(deletedPerson => {
		      console.log("Deleted person", deletedPerson)
		      setPersons(persons.filter(person => person.id !== id))
	      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error}/>
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
