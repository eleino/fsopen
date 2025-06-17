import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import AddContact from './components/AddContact'
import Persons from "./components/Persons"
import phoneService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterFor, setFilterFor] = useState('')

  useEffect(() => {
    phoneService
      .getAll()
      .then(people => {
        setPersons(people)
      })
  }, [])

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
          setNewName("")
          setNewNumber("")
        })
    }
    else if (newName === "" || newNumber === "") alert("Name and number can't be empty");
    else if (window.confirm(`${newName} has already been added to the phonebook. Do you want to update the number to ${newNumber}?`)) {
      const person = persons.find(p => p.name === newName)
      const newPerson = { ...person, number: newNumber }
      phoneService
        .updatePerson(newPerson)
        .then(updatedPerson => {
          setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
          setNewName("")
          setNewNumber("")
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
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterFor} onChange={handleFilter} />
      <h2>Add a new contact</h2>
      <AddContact onSubmit={handleSubmit} newName={newName} newNumber={newNumber} onNameChange={handleNameChange} onNumChange={handleNumChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterFor={filterFor} deletePerson={deletePerson} />
    </div>
  )
}

export default App