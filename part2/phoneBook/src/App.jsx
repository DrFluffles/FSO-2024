import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const Person = ({name, key}) =>{
    return (<li key = {key}>{name}</li>)
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
      name: newName
    }
    setPersons([...persons, newNameObject]); // Append newNameObject to persons array
    setNewName('')
    
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <div>debug: {newName}</div>
      <form onSubmit = {addPerson}>
        <div>
          name: <input value = {newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
      <ul>
        {persons.map((person, i) => (
          <Person key = {i} name = {person.name}/>
          
        ))}
      </ul>
      ...
    </div>
  )
}

export default App

/*{persons.map(person =>
  <Person name = {persons.name}/>
)}*/
/*
persons.map((person) =>{
  if(person.name === newName){
    alert(`${newName} exist in the list`)
    return;
  }
})*/

/*for(let i = 0; i < persons.length; i++){
      if(persons[i].name === newName){
        alert(`${newName} exist in the list`)
        break;
      }
      
    }*/