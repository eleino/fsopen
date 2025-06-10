import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import AddContact from './components/AddContact'
import Persons from "./components/Persons"
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterFor, setFilterFor] = useState('')

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  },[])

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
      setPersons(persons.concat(newPerson))
      setNewName("")
      setNewNumber("")
    } else if (newName === "" || newNumber === "") alert("Name and number can't be empty"); else alert(`${newName} has already been added to the phonebook`)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterFor} onChange={handleFilter} />
      <h2>Add a new contact</h2>
      <AddContact onSubmit={handleSubmit} newName={newName} newNumber={newNumber} onNameChange={handleNameChange} onNumChange={handleNumChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterFor={filterFor}/>
    </div>
  )

}

export default App