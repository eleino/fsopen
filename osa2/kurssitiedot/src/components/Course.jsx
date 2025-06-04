// Course.jsx
const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Content = ({ parts }) => {
  const mapProps = parts.map((part) => {
    return (<Part key={part.id} name={part.name} exercises={part.exercises} />)
  })
  return (
    <>
      {mapProps}
    </>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)
  return (
    <p>Total of {total} exercises</p>
  )
}

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
)

export default Course