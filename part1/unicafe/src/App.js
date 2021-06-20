import react, { useState } from "react"

const Header = () => {
  /**
   * Displays the name of the App
   */
  return (
    <h1>give feedback</h1>
  )
}

const Button = ({ text, handleClick }) => {
  /**
   * Displays the button with associated functionality
   * Props:
   *    - text: text on the button
   *    - handleClick: event handler for the button
   */
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistic = (props) => {
  /** 
   * Displays a single statistic.
   * Props:
   *    - percentage: boolean, display % sign or not
   *    - text: display the name of the statistic
   *    - value: display the value of a statistic
   */
  if (props.percentage == false) {
    return(
      <tr>
        <td>{props.text}</td><td>{props.value}</td>
      </tr>
    )
  }
  else {
    return(
      <tr>
        <td>{props.text}</td><td>{props.value}%</td>
      </tr>
    )
  }
}

const Statistics = (props) => {
  /**
   * Displays all statistics.
   * The statistics displayed are:
   *    - number of positive feedback
   *    - number of neutral feedbakc
   *    - number of negative feedback
   *    - average feedback score
   *    - % of positive feedback
   * 
   * Props:
   *    - good: number of positive feedback
   *    - neutral: number of neutral feedback
   *    - bad: number of negative feedback
   *    - all: number of all feedback
   *    - average: average feedback score
   *    - positive: % of positive feedback
   */
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return(
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text="good" value={props.good} percentage={false} />
          <Statistic text="neutral" value={props.neutral} percentage={false}/>
          <Statistic text="bad" value={props.bad} percentage={false}/>
          <Statistic text="all" value={props.all} percentage={false}/>
          <Statistic text="average" value={props.average} percentage={false}/>
          <Statistic text="positive" value={props.positive} percentage={true}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  /**
   * Master component
   * The application gathers feedback (good, neutral, bad) from users and displays
   * the statistics
   */

  // save clicks for each feedback to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //event handlers for adding feddback
  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)

  //event handler for calculating all votes that have been given
  const allFeedback = () => good + neutral + bad
  
  const average = () => {
    /**
     * Calculates the average feedback score.
     * Good feddback == 1, neutral feedback == 0, bad feedback == 1.
     */
    let cummulative = good + (bad * (-1))
    let average = cummulative / allFeedback()
    return average
  }

  //event handler that calculates the percantage of positive feedback
  const positiveFeedback = () => (good / allFeedback()) * 100

  return (
    <div>
      <Header />
      <Button handleClick={addGood} text="good" />
      <Button handleClick={addNeutral} text="neutral" />
      <Button handleClick={addBad} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} 
        all={allFeedback()} average={average()} positive={positiveFeedback()}/>
    </div>
  )
}

export default App;