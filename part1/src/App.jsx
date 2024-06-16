const Header = (course) =>{
  return <h1>{course.name}</h1>
}
const Content = (props) => {
  return <div> 
    <Part name = {props.part1} exercise = {props.exercises1}/>
    <Part name = {props.part2} exercise = {props.exercises2}/>
    <Part name = {props.part3} exercise = {props.exercises3}/>
  </div>
}

const Part = (part) =>{
  return <p>{part.name}{part.exercise}</p>
}

const Total = (prop) => {
  return <p> Number of exercises {prop.one + prop.two + prop.three}</p> 
}



const App = () => {
  const course = 'Half Stack appasdsadadication development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name = {course}/>
      <Content 
      part1 = {part1} exercises1 = {exercises1}
      part2 = {part2} exercises2 = {exercises2}
      part3 = {part3} exercises3 = {exercises3}/>
      <Total one = {exercises1} two = {exercises2} three = {exercises3}/>
    </div>
  )
}

export default App