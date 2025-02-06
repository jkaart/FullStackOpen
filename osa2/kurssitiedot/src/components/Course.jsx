const Header = ({ name }) => (
  <>
    <h2>{name}</h2>
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

const Total = ({ parts }) => {
  const total = parts.reduce(
    (accumulator, part) => accumulator += part.exercises,
    0
  )
  return (
    <>
      <h3>Total of exercises {total}</h3>
    </>
  )
}

const Course = ({ courses }) => (
  <>
    {
      courses.map((course, i) => (
        <div key={i}>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))
    }
  </>
)

export default Course