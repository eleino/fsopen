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
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Content = (props) => {
  const mapProps = props.parts.map((part, idx) => {
    return (<Parts key={idx} name={part.name} exercises={part.exercises} />)
  })
  return (
    <>
      {mapProps}
    </>
  )
}


const Total = (props) => {
  let total = 0;
  props.parts.forEach(part => {
    total += part.exercises;
  })
  return (
    <p>Number of exercises: {total}</p>
  )
}

const Parts = (props) => (
  <p>
    {props.name} {props.exercises}
  </p>
)
export default App