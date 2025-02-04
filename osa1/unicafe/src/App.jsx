import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Header = ({ text }) => <h1>{text}</h1>

const Display = ({ text, value }) => <div>{text} {value}</div>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

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
        text='Negative'
      />
      <Header
        text='statics'
      />
      <Display text='good' value={good}/>
      <Display text='neutral' value={neutral}/>
      <Display text='bad' value={bad}/>
    </div>
  )
}

export default App
