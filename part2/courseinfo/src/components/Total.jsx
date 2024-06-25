
const Total = ({total}) => {
    let overAllTotal = 0;
    total.forEach(part => {
      overAllTotal += part.exercises;
    })
    return <p>total of {overAllTotal} exercises</p>
  }

export default Total