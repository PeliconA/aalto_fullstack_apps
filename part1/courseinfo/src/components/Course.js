import React from 'react'

const Header = ({name}) => {
    /**
     * Renders the header which contains the name of the course
     */
    return(
    <>
        <h2>{name}</h2>
    </>
    )
}

const Part = (props) => {
    /**
     * Renders a part of the course and associated number of excercises.
     */
    return (
    <>
        <p>{props.part} {props.nr_exercises}</p>
    </>
    )
} 

const Content = ({parts}) => {
    /**
     * Renders each part of the course.
     */
    return (
    <div>
        {parts.map(part => <Part key={part.id} part={part.name} 
        nr_exercises={part.exercises} />)}
    </div>
    )
}

const Total = ({parts}) => {
    /** 
     * Renders the total amount of exercises
     */

    return (
    <>
        <p><b>total of {parts.reduce((accumulator, part) => accumulator + part.exercises,
            0)} exercises</b></p>
    </>
    )
}

const Course = ({name, parts}) => {
    return (
    <div>
        <Header name={name} />
        <Content parts={parts} />
        <Total parts={parts} />
    </div>
    )
}

export default Course