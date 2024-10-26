
import { useState, useEffect } from 'react'
import axios from 'axios'
import phonebookService from './services/phonebook'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  
  useEffect(() => {
    console.log('effect')
    axios
      .get('/api/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  
  console.log('render', persons.length, 'persons')
  
 /*
  useEffect(() => {
    phonebookService
    .getAll()
    .then(allPeople => {
      setPersons(allPeople)
    })
  }, [])
  */
  
  
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [searchPerson, setSearchPerson] = useState('')
  const [filteredPerson, setFilteredPerson] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
 

  const Person = ({name, id, phoneNumber, onClick}) =>{
    return (<li id = {id}>{name} {phoneNumber} <button onClick ={onClick}>delete {name}</button></li>)
  }

  const deletePerson = (person, i) =>{
    alert(person.name);
    console.log(i);
    console.log("Name", person.name + "i:", i, +"personid:", person.id)
    
    phonebookService
    .deleteRecord(person.id)
    .then(returnedNameObject => {
      //setPersons(returnedNameObject)
      setPersons(persons.filter(p => p.id !== person.id));
      console.log("Deleted ", returnedNameObject)
    })
    .catch(error => {
      console.error('Error deleting person: ', error)
    })
    
    
  }

  const checkPhoneBook = (existingNames, newName) =>{
    for(let i = 0; i < existingNames.length; i++){
      if(existingNames[i].name === newName){
        return true;
      }
      
   
  }
}
const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

  const addPerson = (event) =>{
    var pd = true;
    if(checkPhoneBook(persons, newName)){
    alert("testing")
      const existingPerson = persons.find(person => person.name === newName)
      const updatedPerson = { ...existingPerson, phoneNumber: newPhoneNumber };
      alert(existingPerson.id)
      
      console.log('Updated Person:', updatedPerson);
      phonebookService
            .update(existingPerson.id, updatedPerson)
            .then(returnedPerson => {
                setPersons(persons.map(person => person.id !== existingPerson.id ? person : updatedPerson));
                setNewName('');
                setNumber('');
            });
    }
    else {
    event.preventDefault()
    const newNameObject = {
      //id: generateId(),
      name: newName,
      phoneNumber: newPhoneNumber
    }
    phonebookService
    .create(newNameObject)
    .then(returnedNameObject => {
      console.log("Returned: ",returnedNameObject);
      setPersons(persons.concat(newNameObject))
      setNewName('')
      setNumber('')
    })
    .catch(error => {
      setErrorMessage(error.response.data.error)
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


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {errorMessage} />
      <div style = {{background: "green"}}>Filter shown with: <input value = {searchPerson} onChange = {handleSearchPerson}></input></div>
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