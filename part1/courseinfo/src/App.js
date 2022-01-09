import React from 'react'
import Course from './components/Course'

const Title = ({title}) => {
    /**
   * Renders the title of the webapp
   */
  return (
    <>
      <h1>{title}</h1>
    </>
  )
}
  
const App = () => {
  /**
   * Master component
   */

  /** Contains the contents of the course 
   * - name: name of the course
   * - parts: array that contains the data for each part of the course.
              Each part consists of a:
                - name: name of a part
                - excercises: number of exercises of a part
  */
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      id: 2,
      name: 'Node.js',
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  return (
    <div>
      <Title title='Web development curriculum' />
      {courses.map(course => <Course key={course.id} name={course.name} 
        parts={course.parts}/>)}
    </div>
  )
}

  export default App