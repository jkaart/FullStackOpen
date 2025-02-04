import { useState } from 'react'

const average = ({ good, bad, total }) => (good - bad) / total
const positives = ({ good, total }) => good / total * 100

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Header = ({ text }) => <h1>{text}</h1>

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Table = ({ values }) => (
  <table>
    <tbody>
      <StatisticLine text={values[0].text} value={values[0].value} />
      <StatisticLine text={values[1].text} value={values[1].value} />
      <StatisticLine text={values[2].text} value={values[2].value} />
      <StatisticLine text={values[3].text} value={values[3].value} />
      <StatisticLine text={values[4].text} value={values[4].value} />
      <StatisticLine text={values[5].text} value={values[5].value} />
    </tbody>
  </table>
)

const Statics = ({ good, neutral, bad, total }) => {
  const values = [
    { value: good, text: 'good' },
    { value: neutral, text: 'neutral' },
    { value: bad, text: 'bad' },
    { value: total, text: 'all' },
    { value: average({ good, bad, total }), text: 'average' },
    { value: positives({ good, total }) + ' %', text: 'positive' },
  ]
  if (total) {
    return (
      <div>
        <Table values={values} />
      </div>
    )
  }
  return (
    <div>
      <p>No feedback given</p>
    </div>
  )
}

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
      <Header text='statics' />
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
