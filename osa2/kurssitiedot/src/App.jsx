const Header = ({ name }) => (
  <>
    <h1>{name}</h1>
  </>
)

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
)

const Content = ({ parts }) => (
  <>
    {parts.map((part, index) => (
      <Part
        name={part.name}
        exercises={part.exercises}
        key={index}
      />
    ))}
  </>
)

const Total = (props) => {
  const total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}

const Course = ({ course }) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
  </div>

)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      }
    ]
  }

  return (
    <div>
      {/* <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} /> */}
      <Course course={course} />
    </div>
  )
}

export default App
