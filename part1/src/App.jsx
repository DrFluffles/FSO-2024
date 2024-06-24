import { useState } from 'react'

const Header = ({name}) => {
  return (
  <div>
  <p>{name}</p>
  </div>
  )
}

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const Total = (props) =>(
  <div>
    <p>Good: {props.totalGood}</p>
    <p>Neutral: {props.totalNeutral}</p>
    <p>Bad: {props.totalBad}</p>
    <p>All: {props.all}</p>
  </div>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  const handleGoodClick = () => {
    setGood(good +1)
    console.log(good);
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1) 
  }

  const handleBadClick = () => {
    setBad(bad + 1) 
  }

  const randomNumberButton = () => {
    let number = Math.floor((Math.random() * 7) + 1)
    setSelected(number)
    console.log(selected)
  }

  return (
    
      <div>
      <Header name = "Fuckkks" />
      <Button onClick = {handleGoodClick} text='good' />
      <Button onClick = {handleNeutralClick} text='neutral' />
      <Button onClick = {handleBadClick} text='bad' />
      <Button onClick = {randomNumberButton} text = 'Random quote'/>
      <Total totalGood = {good} totalNeutral = {neutral} totalBad = {bad} all ={good + neutral + bad}/>
      
      {anecdotes[selected]}
      </div>
  )
}


export default App