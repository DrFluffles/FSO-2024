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
  

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name = {course.name}/>
      <Content 
      part1 = {course.parts[0].name} exercises1 = {course.parts[0].exercises}
      part2 = {course.parts[1].name} exercises2 = {course.parts[1].exercises}
      part3 = {course.parts[2].name} exercises3 = {course.parts[2].exercises}/>
      <Total one = {course.parts[0].exercises} two = {course.parts[1].exercises} three = {course.parts[2].exercises}/>
    </div>
  )
}

export default App