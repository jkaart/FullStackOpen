import { useState } from 'react'

const average = ({ good, bad, total }) => (good - bad) / total
const positives = ({ good, total }) => good / total * 100

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Header = ({ text }) => <h1>{text}</h1>

const StatisticLine = ({ text, value }) => <div>{text} {value}</div>

const Statics = ({ good, neutral, bad, total }) => (
  <div>
    <Header text='statics' />
    <StatisticLine text='good' value={good} />
    <StatisticLine text='neutral' value={neutral} />
    <StatisticLine text='bad' value={bad} />
    <StatisticLine text='all' value={total} />
    <StatisticLine text='average' value={average({ good, bad, total })} />
    <StatisticLine text='positives' value={positives({ good, total })} />
  </div>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }

  return (
    <div>
      <Header text='give feedback' />
      <Button
        onClick={handleGoodClick}
        text='Good'
      />
      <Button
        onClick={handleNeutralClick}
        text='Neutral'
      />
      <Button
        onClick={handleBadClick}
        text='Bad'
      />
      <Statics
        good={good}
        bad={bad}
        neutral={neutral}
        total={total}
      />
    </div>
  )
}

export default App
