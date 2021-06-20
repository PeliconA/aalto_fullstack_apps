import react, { useState } from "react";

const Button = ({ handleClick, text }) => {
  /**
   * Component which renders a button with associated event handler and text.
   * Event handler and text are passed as prompts.
   */
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Title = ({text}) => {
  /**
   * Renders the title of the App. Title is passed in as a prop.
   */
  return(
    <h1>{text}</h1>
  )
}

const AnecdoteDisplay = ({ anecdote, votes }) => {
  /**Component which displays an anecdote and its number of votes.
   * Anecdote and number of votes are passed in as props.
   */
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const App = () => {
  /**
   * Master component.
   * Displays a random anecdote from a predefined list.
   * With associated buttons the user can generate another random anecdote or vote on a
   * currently displayed anecdote.
   * The application also displays the anecdote which currently has the most votes.
   */
  const anecdotes = [
    /**
     * List which contains all the anecdotes.
     */
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]

  const initializeVotes = () => {
    /**Initializes the list with the number of votes for each anecdote. */
    let votes = Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0)
    return votes
  }

  /**State variable which contains the index of a currently selected anecdote to display. */
  const [selected, setSelected] = useState(0)
  /**State variable which contains a list with number of votes for each anecdote.
   * Votes for a particular anecdote are saved at the same index at which the anecdote
   * is saved in the 'anecdotes' list.
   * For example anecdote at anecdotes[3] has its vote saved in votes[3].
   */
  const [votes, setVotes] = useState(initializeVotes())

  /**Helper function which generates a random number in a min-max range. */
  const randomIntGenerator = (min, max) => Math.floor(Math.random() * (max - min) + min)

  const selectAnecdote = () => {
    /**Function which selects a random anecdote from 'ancedotes' list.*/
    let number = randomIntGenerator(0, anecdotes.length)
    setSelected(number)
  }

  const vote = () => {
    /**Function which updates the number of votes. */
    let votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
  }

  const getMaxVotesIndex = () => {
    /**Gets the index of anecdote with maximum votes. */
    let max = votes[0]
    let max_index = 0
    for(let i = 1; i < votes.length; i++) {
      if(max < votes[i]) {
        max = votes[i]
        max_index = i
      }
    }
    return max_index
  }

  const max_index = getMaxVotesIndex()

  return (
    <div>
      <Title text="Anecdote of the day"/>
      <AnecdoteDisplay anecdote={anecdotes[selected]} votes={votes[selected]}/>
      <Button handleClick={vote} text="vote"/>
      <Button handleClick={selectAnecdote} text="next anecdote"/>
      <Title text="Anecdote with most votes"/>
      <AnecdoteDisplay anecdote={anecdotes[max_index]} votes={votes[max_index]} />
    </div>
  )
}

export default App;
