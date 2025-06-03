import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <>
      <Title text="Give feedback" />
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Statistics stats={[good, neutral, bad]} />
    </>
  )
}

const Title = (props) => <h1>{props.text}</h1>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistics = ({ stats }) => {
  // stats = good, neutral, bad
  const total = stats.reduce((sum, value) => sum + value, 0)
  const average = (stats[0] - stats[2]) / total || 0 // good - bad / all
  const positive = (stats[0] / total * 100) || 0

  return (
    <>
      <Title text="Statistics" />
      {total === 0 ? <p>No feedback given</p> :
        <table>
          <tbody>
            <Stat text="good" value={stats[0]} />
            <Stat text="neutral" value={stats[1]} />
            <Stat text="bad" value={stats[2]} />
            <Stat text="all" value={total} />
            <Stat text="average" value={average.toFixed(2)} />
            <Stat text="positive" value={`${positive.toFixed(2)} %`} />
          </tbody>
        </table>
      }
    </>
  )
}


const Stat = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

export default App