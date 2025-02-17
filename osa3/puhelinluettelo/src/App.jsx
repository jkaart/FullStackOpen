import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  const showNotification = ({ message, type }) => {
    setNotificationMessage(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationType(null)
    }, 5000)
  }

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const personsToShow = !filter
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()

    const foundPerson = persons.find(person => person.name === newName)
    if (!foundPerson) {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          showNotification({ message: `${response.name} added successfully`, type: 'info' })
        })
        .catch(error => {
          console.log(error.response.data)
          showNotification({ message: error.response.data.error, type: 'error' })
        })
    }
    else {
      const result = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (result) {
        const personObject = {
          id: foundPerson.id,
          name: foundPerson.name,
          number: newNumber,
        }
        personService
          .replace(personObject)
          .then(response => {
            setPersons(persons.map(person => person.id !== response.id ? person : response))
            showNotification({ message: `${response.name} number replaced successfully`, type: 'info' })
          })
          .catch(error => {
            console.log(error)
            showNotification({ message: error.response.data.error, type: 'error' })
          })
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = ({ id, name }) => {
    const result = window.confirm(`Delete ${name} ?`)
    if (result) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          showNotification({ message: `${name} deleted successfully`, type: 'info' })
        })
        .catch(() => {
          showNotification({ message: `${name} already deleted`, type: 'error' })
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />

      <Filter value={filter} onChange={handleFilterChange} />

      <h3>add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        numberValue={newNumber}
        nameOnChange={handleNameChange}
        numberOnChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deleteOnClick={removePerson} />
    </div>
  )
}

export default App
