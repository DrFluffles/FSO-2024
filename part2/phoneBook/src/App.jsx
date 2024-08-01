
import { useState, useEffect } from 'react'
import axios from 'axios'
import phonebookService from './services/phonebook'
import './index.css'

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
  const [errorMessage, setErrorMessage] = useState('some error happened...')
 

  const Person = ({name, key, phoneNumber, onClick}) =>{
    return (<li id = {key}>{name} {phoneNumber} <button onClick ={onClick}>delete {name}</button></li>)
  }

  const deletePerson = (person, i) =>{
    alert(person.name);
    console.log(i);
    
    phonebookService
    .deleteRecord(person.id)
    .then(returnedNameObject => {
      setPersons(persons.filter(person => person.id !== person.id))
      console.log(returnedNameObject)
    })
    .catch(error => {
      setErrorMessage(
        `Unable to delete ${person.name} person was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
    
    
  }

  const checkPhoneBook = (existingNames, newName) =>{
    for(let i = 0; i < existingNames.length; i++){
      if(existingNames[i].name === newName){
        return true;
      }
      
   
  }
}

  const addPerson = (event) =>{
    if(checkPhoneBook(persons, newName)){
      const existingPerson = persons.find(person => person.name === newName)
      const updatedPerson = { ...existingPerson, phoneNumber: newPhoneNumber };
      console.log('Updated Person:', updatedPerson);
      phonebookService
            .update(existingPerson.id, updatedPerson)
            .then(returnedPerson => {
                setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson));
                setNewName('');
                setNumber('');
            
            })
            .catch(error => {
              setErrorMessage(
                `Unable to add person was already removed from server`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            })
            
            
    }
    else {
    event.preventDefault()
    const newNameObject = {
      name: newName,
      phoneNumber: newPhoneNumber
    }
    setErrorMessage(
      `User ${newNameObject.name} person added`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    phonebookService
    .create(newNameObject)
    .then(returnedNameObject => {
      setPersons(persons.concat(returnedNameObject))
      setNewName('')
    })
  }
    
    //setPersons([...persons, newNameObject]); // Append newNameObject to persons array
  }

  const handleNameChange = (event) => {
    
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    
    setNumber(event.target.value)
  }

  const handleSearchPerson = (event) => {
    
    const searchValue = event.target.value;
  setSearchPerson(searchValue);

    const filterItems = persons.filter(person => person.name && person.name.includes(searchValue));
  setFilteredPerson(filterItems);
  };

  const Notification = ({ message }) => {
    console.log("Message", message);
    if (message === null) {
      return null
    }
  
    return (
      <div className='error'>
        <h1>{message}</h1>
      </div>
    )
  }


  return (
    <div>
      


      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
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
        {filteredPerson.map((person) => (
          <Person key = {person.id} name = {person.name} phoneNumber = {person.phoneNumber} onClick = {() => {deletePerson(person, person.key)}}/>
          
        ))}
      </ul>
      
      ...
    </div>
  )
}

export default App