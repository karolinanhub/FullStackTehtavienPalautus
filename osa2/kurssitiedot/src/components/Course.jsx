const Course = ({ course }) => { 
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total total={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
      </div>
    )
  }

const Header = (props) => <h1>{props.course}</h1>

// Content component regardless of the number of parts
const Content = (props) => (
<div>
    {props.parts.map(part => (
    <Part key={part.id} part={part} />
    ))}
</div>
)

const Part = (props) => (
<p>
    {props.part.name} {props.part.exercises}
</p>
)

const Total = (props) => <p><strong>total of {props.total} exercises</strong></p>

export default Course
