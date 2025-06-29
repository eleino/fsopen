import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import AddContact from './components/AddContact'
import Persons from "./components/Persons"
import phoneService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterFor, setFilterFor] = useState('')
  const [message, setMessage] = useState({message:null,isError:false})

  useEffect(() => {
    phoneService
      .getAll()
      .then(people => {
        setPersons(people)
      })
  }, [])

  const useMessage = (message, isError=false) => {
    setMessage({message, isError})
    setTimeout(() => setMessage({message:null,isError:false}),3000)
  }

  const handleFilter = (event) => {
    setFilterFor(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumChange = (event) => {
    setNewNumber(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (!persons.some((person) => person.name === newName) && newName !== "" && newNumber !== "") {
      phoneService
        .addPerson(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          useMessage(`Added ${returnedPerson.name} to the phonebook`)
          setNewName("")
          setNewNumber("")
        })
    }
    else if (newName === "" || newNumber === "") useMessage("Name and number can't be empty", true);
    else if (window.confirm(`${newName} has already been added to the phonebook. Do you want to update the number to ${newNumber}?`)) {
      const person = persons.find(p => p.name === newName)
      const newPerson = { ...person, number: newNumber }
      phoneService
        .updatePerson(newPerson)
        .then(updatedPerson => {
          setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
          useMessage(`${updatedPerson.name}'s number updated to ${updatedPerson.number}`)
          setNewName("")
          setNewNumber("")
        })
        .catch(error => {
          useMessage(`${newPerson.name} does not exist in the phonebook`, true)
          setPersons(persons.filter(p => p.id !== newPerson.id))

        })
    }
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      phoneService
        .deletePerson(id)
        .then(deleted => {
          setPersons(persons.filter(p => p.id !== deleted.id))
          useMessage(`${deleted.name} removed from the phonebook`)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notify={message} />
      <Filter value={filterFor} onChange={handleFilter} />
      <h2>Add a new contact</h2>
      <AddContact onSubmit={handleSubmit} newName={newName} newNumber={newNumber} onNameChange={handleNameChange} onNumChange={handleNumChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterFor={filterFor} deletePerson={deletePerson} />
    </div>
  )
}

export default App