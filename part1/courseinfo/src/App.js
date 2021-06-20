import React from 'react'

const Header = (props) => {
  /**
   * Renders the header which contains the title of the course
   */
    return[
      <h1>{props.course}</h1>
    ]
  }
  
  const Part = (props) => {
    /**
     * Renders a part of the course and associated number of excercises.
     */
    return [
      <p>{props.part} {props.nr_exercises}</p>
    ]
  } 
  
  const Content = (props) => {
    /**
     * Renders each part of the course.
     */
    return (
      <div>
        <Part part={props.parts[0].name} nr_exercises={props.parts[0].exercises} />
        <Part part={props.parts[1].name} nr_exercises={props.parts[1].exercises} />
        <Part part={props.parts[2].name} nr_exercises={props.parts[2].exercises} /> 
      </div>
      )
  }
  
  const Total = (props) => {
    /** 
     * Renders the total amount of exercises
    */

    return [
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + 
        props.parts[2].exercises}</p>
    ]
  }
  
  const App = () => {
    /**
     * Master component
     */

    const course = {
      /** Contains the name of the course */
      name: 'Half Stack application development',
      /** Array that contains the data for each part of the course.
       * Each part consists of a:
       *    - name: name of a part
       *    - excercises: number of exercises of a part
       */
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

  export default App