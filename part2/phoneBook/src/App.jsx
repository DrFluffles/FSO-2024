
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  
  
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [searchPerson, setSearchPerson] = useState('')
  const [filteredPerson, setFilteredPerson] = useState([])
 

  const Person = ({name, key, phoneNumber}) =>{
    return (<li key = {key}>{name} {phoneNumber}</li>)
  }

  const checkPhoneBook = (existingNames, newName) =>{
    for(let i = 0; i < existingNames.length; i++){
      if(existingNames[i].name === newName){
        alert(`${newName} exist in the list`)
        break;
      }
      
   
  }
}

  const addPerson = (event) =>{
    checkPhoneBook(persons, newName)
    event.preventDefault()
    const newNameObject = {
      name: newName,
      phoneNumber: newPhoneNumber
    }
    setPersons([...persons, newNameObject]); // Append newNameObject to persons array
    setNewName('')
    
  }

  const handleNameChange = (event) => {
    
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    
    setNumber(event.target.value)
  }

  const handleSearchPerson = (event) => {
    setSearchPerson(event.target.value);

    const filterItems = persons.filter(person => person.name.includes(event.target.value))
    console.log(filterItems)
    setFilteredPerson(filterItems)
  };


  return (
    <div>
      


      <h2>Phonebook</h2>
      <div>Filter shown with: <input value = {searchPerson} onChange = {handleSearchPerson}></input></div>
      <div>Search Value: {searchPerson}</div>
      <form onSubmit = {addPerson}>
        <div>
          name: <input value = {newName} onChange={handleNameChange} />
        </div>
        <div>
        Phone Number: <input value = {newPhoneNumber} onChange = {handleNumberChange}></input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
      <ul>
        {filteredPerson.map((person, i) => (
          <Person key = {i} name = {person.name} phoneNumber = {person.phoneNumber}/>
          
        ))}
      </ul>
      
      ...
    </div>
  )
}

export default App

